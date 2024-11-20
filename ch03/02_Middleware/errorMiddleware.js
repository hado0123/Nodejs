const express = require('express')
const path = require('path')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

// 5. 에러처리 미들웨어: 에러 처리를 위해 사용하는 미들웨어
// 에러 처리 미들웨어는 일반 미들웨어와는 달리, 4개의 매개변수(err, req, res, next)를 가집니다.

// 일반 라우트
app.get('/', (req, res) => {
   res.send('환영합니다!')
})

// 강제로 에러 발생
app.get('/error', (req, res, next) => {
   const err = new Error('에러 발생!')
   err.status = 500 // 에러 상태 코드 설정
   next(err) // 에러 처리 미들웨어로 전달
})

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
   console.error('Error occurred:', err.message) // 에러 메시지 출력
   res.status(err.status || 500).json({
      error: {
         message: err.message || '서버 내부 에러',
      },
   })
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
