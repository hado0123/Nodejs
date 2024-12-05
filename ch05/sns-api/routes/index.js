const express = require('express')
const { User } = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => {
   try {
      const user = await User.findOne({
         where: { id: (req.user && req.user.id) || null },
      })

      if (!user) {
         return res.status(404).json({
            success: false,
            message: '사용자를 찾을 수 없습니다.',
         })
      }

      res.json({
         success: true,
         message: '사용자 정보를 성공적으로 가져왔습니다.',
         user: {
            id: user.id,
            email: user.email,
            nick: user.nick,
         },
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '사용자 정보를 가져오는 도중 오류가 발생했습니다.',
         error: err,
      })
   }
})

module.exports = router
