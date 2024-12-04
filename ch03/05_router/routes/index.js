const express = require('express')

const router = express.Router()

// 1. 라우터 기본사용
router.get('/', (req, res) => {
   res.send('Hello, Express')
})

// localhost:8000/user로 들어오면 이 부분이 실행된다.
/* 
   app.js에서 
   app.use('/', indexRouter)
   app.use('/user', userRouter)
   순서로 되어있기 때문이다.
*/
router.get('/:id', (req, res) => {
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
