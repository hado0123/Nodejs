const express = require('express')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

//1. 전역 미들웨어: 애플리케이션의 모든 요청에 대해 동작하는 미들웨어
app.use((req, res, next) => {
   console.log(`${req.method} ${req.url}`)
   console.log('미들웨어 1 실행. 모든 요청에 다 동작합니다.')
   next() //다음 미들웨어로 이동
})

// 미들웨어 2
app.use((req, res, next) => {
   console.log('미들웨어 2 실행')
   next() // 다음 미들웨어(app.get('/', ()=> {..}))로 이동
})

app.get('/', (req, res) => {
   res.send('홈 페이지')
})

app.get('/about', (req, res) => {
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
