const express = require('express')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

//res.locals을 이용한 미들웨어 간 데이터 공유

// 첫 번째 미들웨어: res.locals에 데이터 저장
app.use((req, res, next) => {
   res.locals.appName = 'MyExpressApp' // 애플리케이션 이름 저장
   res.locals.timestamp = new Date().toISOString() // 현재 시간 저장
   console.log('First middleware: res.locals 데이터 세팅 완료')
   next() // 다음 미들웨어로 이동
})

// 두 번째 미들웨어: res.locals 데이터 활용
app.use((req, res, next) => {
   console.log(`App Name: ${res.locals.appName}`) // 첫 번째 미들웨어에서 설정한 데이터
   console.log(`Request received at: ${res.locals.timestamp}`)
   next() // 다음 미들웨어로 이동
})

// 라우트 핸들러: res.locals 데이터 응답
app.get('/', (req, res) => {
   res.send(`
    <h1>환영합니다! ${res.locals.appName}입니다!</h1>
    <p>Request received at: ${res.locals.timestamp}</p>
  `)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
