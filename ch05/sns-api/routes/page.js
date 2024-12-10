const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { Post, User, Hashtag } = require('../models')

const router = express.Router()

// 사용자 정보 및 팔로우 관련 데이터 설정
router.use((req, res, next) => {
   res.locals.user = req.user
   res.locals.followerCount = req.user ? req.user.Followers.length : 0
   res.locals.followingCount = req.user ? req.user.Followings.length : 0
   res.locals.followerIdList = req.user ? req.user.Followings.map((f) => f.id) : []
   next()
})

// 프로필 조회
router.get('/profile', isLoggedIn, (req, res) => {
   res.json({
      success: true,
      user: req.user,
      message: '프로필 정보를 성공적으로 가져왔습니다.',
   })
})

// 메인 피드
router.get('/', async (req, res, next) => {
   try {
      const posts = await Post.findAll({
         include: {
            model: User,
            attributes: ['id', 'nick'],
         },
         order: [['createdAt', 'DESC']],
      })
      res.json({
         success: true,
         posts,
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시물을 가져오는 중 오류가 발생했습니다.',
         error: err,
      })
   }
})

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
