// const express = require('express')
// const multer = require('multer')
// const path = require('path')
// const fs = require('fs')

// const { Post, Hashtag } = require('../models')
// const { isLoggedIn } = require('./middlewares')

// const router = express.Router()

// // Ensure 'uploads' directory exists
// try {
//    fs.readdirSync('uploads')
// } catch (error) {
//    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
//    fs.mkdirSync('uploads')
// }

// // Multer configuration for image uploads
// const upload = multer({
//    storage: multer.diskStorage({
//       destination(req, file, cb) {
//          cb(null, 'uploads/')
//       },
//       filename(req, file, cb) {
//          const ext = path.extname(file.originalname)
//          cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
//       },
//    }),
//    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// })

// // Route for image upload
// router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
//    console.log(req.file)
//    res.json({ success: true, url: `/img/${req.file.filename}` })
// })

// // Multer configuration for non-file data
// const upload2 = multer()

// // Route for creating a post
// router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
//    try {
//       console.log(req.user)
//       const post = await Post.create({
//          content: req.body.content,
//          img: req.body.url,
//          UserId: req.user.id,
//       })

//       // Extract hashtags from content
//       const hashtags = req.body.content.match(/#[^\s#]*/g)
//       if (hashtags) {
//          const result = await Promise.all(
//             hashtags.map((tag) =>
//                Hashtag.findOrCreate({
//                   where: { title: tag.slice(1).toLowerCase() },
//                })
//             )
//          )
//          await post.addHashtags(result.map((r) => r[0]))
//       }

//       // Respond with created post data
//       res.json({
//          success: true,
//          post: {
//             id: post.id,
//             content: post.content,
//             img: post.img,
//             UserId: post.UserId,
//          },
//          message: '게시물이 성공적으로 등록되었습니다.',
//       })
//    } catch (error) {
//       console.error(error)
//       res.status(500).json({ success: false, message: 'An error occurred.', error })
//    }
// })

// module.exports = router

const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { Post, Hashtag } = require('../models')
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

// 이미지 업로드 라우터
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
   console.log(req.file)
   res.json({ success: true, url: `/img/${req.file.filename}` }) // 업로드된 이미지 URL 반환
})

// 텍스트 데이터 전송을 위한 multer 설정 (파일 제외)
const upload2 = multer()

// 게시물 등록 라우터
router.post('/', isLoggedIn, upload2.none(), async (req, res) => {
   try {
      console.log(req.user)
      const post = await Post.create({
         content: req.body.content, // 게시물 내용
         img: req.body.url, // 이미지 URL
         UserId: req.user.id, // 작성자 ID
      })

      // 게시물 내용에서 해시태그 추출
      const hashtags = req.body.content.match(/#[^\s#]*/g)
      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1).toLowerCase() }, // 해시태그 소문자 변환 후 저장
               })
            )
         )
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
router.put('/:id', isLoggedIn, upload2.none(), async (req, res) => {
   try {
      const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      // 게시물 수정
      await post.update({
         content: req.body.content, // 수정된 내용
         img: req.body.url, // 수정된 이미지 URL
      })

      // 해시태그 재설정
      const hashtags = req.body.content.match(/#[^\s#]*/g)
      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1).toLowerCase() }, // 해시태그 소문자 변환 후 저장
               })
            )
         )
         await post.setHashtags(result.map((r) => r[0])) // 기존 해시태그를 새 해시태그로 교체
      }

      res.json({
         success: true,
         post: {
            id: post.id,
            content: post.content,
            img: post.img,
            UserId: post.UserId,
         },
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.', error })
   }
})

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

module.exports = router
