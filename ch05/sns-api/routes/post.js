const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { Post, Hashtag, User } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

// 'uploads' 폴더가 없을 경우 새로 생성
try {
   fs.readdirSync('uploads')
} catch (error) {
   console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

// 이미지 업로드를 위한 multer 설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') // 업로드 폴더 경로 설정
      },
      filename(req, file, cb) {
         const ext = path.extname(file.originalname) // 파일 확장자 추출
         cb(null, path.basename(file.originalname, ext) + Date.now() + ext) // 파일명 설정 (기존 이름 + 업로드 시간)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한 (5MB)
})

// 게시물 등록 라우터
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      console.log(req.file)
      if (!req.file) {
         return res.status(400).json({ success: false, message: '파일 업로드에 실패했습니다.' })
      }

      // 게시물 생성
      const post = await Post.create({
         content: req.body.content, // 게시물 내용
         img: `/${req.file.filename}`, // 이미지 URL
         UserId: req.user.id, // 작성자 ID
      })

      // 게시물 내용에서 해시태그 추출
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )

         // posthashtag 관계 테이블에 연결 데이터 추가
         await post.addHashtags(result.map((r) => r[0])) // 해시태그 연결
      }

      res.json({
         success: true,
         post: {
            id: post.id,
            content: post.content,
            img: post.img,
            UserId: post.UserId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 등록 중 오류가 발생했습니다.', error })
   }
})

// 게시물 수정 라우터
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      // 1️. 게시물 존재 여부 확인
      const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      // 2️. 게시물 수정
      await post.update({
         content: req.body.content, // 수정된 내용
         img: req.file ? `/${req.file.filename}` : post.img, // 수정된 이미지 URL (파일이 있으면 교체, 없으면 기존 URL 유지)
      })

      // 3️. 게시물 내용에서 해시태그 추출
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )

         // 4️. posthashtag 관계 테이블 업데이트 (기존 연결 해제 후 새로운 연결 추가)
         await post.setHashtags(result.map((r) => r[0])) // 기존 해시태그를 새 해시태그로 교체
      }

      // 5️. 게시물 다시 조회 (include 추가)
      const updatedPost = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'], // User의 특정 필드만 가져오기
            },
            {
               model: Hashtag,
               attributes: ['title'], // Hashtag의 title만 가져오기
            },
         ],
      })

      res.json({
         success: true,
         post: updatedPost,
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.', error })
   }
})

// 게시물 수정 (트랜잭션 적용)
// router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
//    const t = await sequelize.transaction()
//    try {
//       const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } }, { transaction: t })
//       if (!post) {
//          return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
//       }

//       await post.update(
//          {
//             content: req.body.content,
//             img: req.file ? `/${req.file.filename}` : post.img,
//          },
//          { transaction: t }
//       )

//       const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
//       if (hashtags) {
//          const result = await Promise.all(
//             hashtags.map((tag) =>
//                Hashtag.findOrCreate(
//                   {
//                      where: { title: tag.slice(1).toLowerCase() },
//                   },
//                   { transaction: t }
//                )
//             )
//          )
//          await post.setHashtags(
//             result.map((r) => r[0]),
//             { transaction: t }
//          )
//       }

//       const updatedPost = await Post.findOne(
//          {
//             where: { id: req.params.id },
//             include: [
//                { model: User, attributes: ['id', 'nick', 'email'] },
//                { model: Hashtag, attributes: ['title'] },
//             ],
//          },
//          { transaction: t }
//       )

//       await t.commit()
//       res.json({ success: true, post: updatedPost, message: '게시물이 성공적으로 수정되었습니다.' })
//    } catch (error) {
//       await t.rollback()
//       res.status(500).json({ success: false, message: '오류가 발생했습니다.', error })
//    }
// })

// 게시물 삭제 라우터
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      // 게시물 삭제
      await post.destroy()

      res.json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 삭제 중 오류가 발생했습니다.', error })
   }
})

// 특정 게시물 불러오기 라우터 (id로 게시물 조회)
router.get('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: { id: req.params.id }, // 특정 id의 게시물 조회
         include: [
            {
               model: User, // 작성자 정보 포함
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Hashtag, // 해시태그 정보 포함
               attributes: ['title'],
            },
         ],
      })

      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      res.json({
         success: true,
         post,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 불러오는 중 오류가 발생했습니다.', error })
   }
})

// 전체 게시물 리스트 불러오기 라우터 (페이징 추가 가능)
router.get('/', async (req, res) => {
   /*
   10을 붙이는 이유: 10진수로 변환
   parseInt('08') // 일부 브라우저에서는 NaN 반환 (오래된 JS 버전)
   parseInt('08', 10) // 8 반환 (정확한 10진수로 해석)
   */
   const page = parseInt(req.query.page, 10) || 1 // page 번호 받기 (기본값: 1)
   const limit = parseInt(req.query.limit, 10) || 3 // 한페이지 당 나타날 레코드 갯수인 limit 받기 (기본값: 3)
   const offset = (page - 1) * limit // 오프셋 계산

   try {
      // count만 따로 가져오기
      const count = await Post.count()

      // posts 따로 가져오기
      const posts = await Post.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })

      res.json({
         success: true,
         posts,
         pagination: {
            totalPosts: count, // 전체 게시물 수
            currentPage: page, // 현재 페이지
            totalPages: Math.ceil(count / limit), // 총 페이지 수
            limit, // 페이지당 게시물 수
         },
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 리스트 불러오는 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
