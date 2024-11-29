const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res, next) => {
   try {
      const users = await User.findAll() // 모든 사용자 데이터를 가져옴
      res.json(users) // JSON 형태로 클라이언트에 응답
   } catch (err) {
      console.error(err)
      next(err) // 에러를 다음 미들웨어로 전달
   }
})

module.exports = router
