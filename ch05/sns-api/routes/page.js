const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { Post, User, Hashtag } = require('../models')

const router = express.Router()

// 사용자 정보 및 팔로우 관련 데이터 설정
// router.use((req, res, next) => {
//    res.locals.user = req.user
//    res.locals.followerCount = req.user ? req.user.Followers.length : 0
//    res.locals.followingCount = req.user ? req.user.Followings.length : 0
//    res.locals.followerIdList = req.user ? req.user.Followings.map((f) => f.id) : []
//    next()
// })

// 내 프로필 조회
router.get('/profile', isLoggedIn, (req, res) => {
   res.json({
      success: true,
      user: req.user,
      message: '프로필 정보를 성공적으로 가져왔습니다.',
   })
})

// 특정인 프로필 조회
router.get('/profile/:id', isLoggedIn, async (req, res) => {
   try {
      const userId = req.params.id // URL에서 사용자 ID 가져오기
      const user = await User.findOne({
         where: { id: userId },
         attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'], // 사용자 기본 정보
         include: [
            {
               model: User,
               as: 'Followers', // 나를 팔로우하는 사람들
               attributes: ['id', 'nick', 'email'], // 팔로워의 기본 정보만 반환
            },
            {
               model: User,
               as: 'Followings', // 내가 팔로잉하는 사람들
               attributes: ['id', 'nick', 'email'], // 팔로잉의 기본 정보만 반환
            },
         ],
      })

      if (!user) {
         return res.status(404).json({
            success: false,
            message: '사용자를 찾을 수 없습니다.',
         })
      }

      // Sequelize는 Followers와 Followings가 배열 형태로 반환됩니다.
      res.json({
         success: true,
         user: {
            id: user.id,
            nick: user.nick,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            Followers: user.Followers, // 팔로워 목록 배열
            Followings: user.Followings, // 팔로잉 목록 배열
         },
         message: '프로필 정보를 성공적으로 가져왔습니다.',
      })
   } catch (error) {
      console.error('오류 발생:', error)
      res.status(500).json({
         success: false,
         message: '서버에서 오류가 발생했습니다.',
         error: error.message,
      })
   }
})

// 메인 피드
// router.get('/', async (req, res, next) => {
//    try {
//       const posts = await Post.findAll({
//          include: {
//             model: User,
//             attributes: ['id', 'nick'],
//          },
//          order: [['createdAt', 'DESC']],
//       })
//       res.json({
//          success: true,
//          posts,
//       })
//    } catch (err) {
//       console.error(err)
//       res.status(500).json({
//          success: false,
//          message: '게시물을 가져오는 중 오류가 발생했습니다.',
//          error: err,
//       })
//    }
// })

// 해시태그 검색
router.get('/hashtag', async (req, res, next) => {
   const query = req.query.hashtag
   if (!query) {
      return res.status(400).json({
         success: false,
         message: '해시태그가 제공되지 않았습니다.',
      })
   }
   try {
      const hashtag = await Hashtag.findOne({ where: { title: query } })
      let posts = []
      if (hashtag) {
         posts = await hashtag.getPosts({ include: [{ model: User }] })
      }
      res.json({
         success: true,
         hashtag: query,
         posts,
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '해시태그로 게시물을 검색하는 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
