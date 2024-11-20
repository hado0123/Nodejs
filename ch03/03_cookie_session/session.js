const express = require('express')
const session = require('express-session')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

// 세션 설정
app.use(
   session({
      name: 'my-session-cookie', // 세션 쿠키 이름 설정
      secret: 'your-secret-key', // 세션을 암호화하는 키
      resave: false, // 세션 데이터가 바뀌지 않아도 저장소에 다시 저장할지 여부
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      cookie: {
         maxAge: 1000 * 60 * 60, // 쿠키의 수명 (밀리초 단위)
         secure: false, // HTTPS를 사용할 때만 쿠키 전송
      },
   })
)

// 세션에 값 저장
app.get('/set-session', (req, res) => {
   req.session.username = '하서' // 세션에 'username' 키로 값 저장
   req.session.role = 'admin' // 세션에 'role' 키로 값 저장
   res.send('세션에 데이터가 저장되었습니다.')
})

// 세션 값 확인
app.get('/get-session', (req, res) => {
   const { username, role } = req.session // 세션에서 'username'과 'role' 값을 가져옴
   if (username && role) {
      res.send(`username: ${username}, role: ${role}, 세션 id: ${req.sessionID}`)
   } else {
      res.send('세션을 찾을 수 없습니다.')
   }
})

// 세션 삭제
app.get('/destroy-session', (req, res) => {
   req.session.destroy((err) => {
      if (err) {
         res.send(`세션 삭제 실패: ${err.message}`)
      } else {
         res.send('세션이 삭제되었습니다.')
      }
   })
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
