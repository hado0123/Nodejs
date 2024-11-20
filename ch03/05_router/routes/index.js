const express = require('express')

const router = express.Router()

// 1. 라우터 기본사용
router.get('/', (req, res) => {
   res.send('Hello, Express')
})

// 2.  next('route')를 이용해 라우터에 연결된 나머지 미들웨어 건너뛰기

/*
router.get(
   '/',
   (req, res, next) => {
      next('route') // 다음 라우터로 넘어감
   },
   (req, res, next) => {
      console.log('실행되지 않습니다.')
      next()
   },
   (req, res, next) => {
      console.log('실행되지 않습니다.')
      next()
   }
)

router.get('/', (req, res) => {
   console.log('실행됩니다.')
   res.send('Hello, Express')
})
*/

module.exports = router
