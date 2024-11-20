const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

// 쿠키 파서 설정 (보안을 강화하기 위해 서명을 추가한 쿠키)
app.use(cookieParser('my-secret-key'))

// 쿠키 설정
app.get('/set-cookie', (req, res) => {
   res.cookie('age', '25', { signed: false, maxAge: 1000 * 60 * 60 }) // 밀리초 단위 - 1시간 동안 유효(서명 보안 X)
   res.cookie('user', 'Alice', { signed: true, maxAge: 1000 * 60 * 60 }) // 밀리초 단위 - 1시간 동안 유효(서명 보안 됨)
   res.send('서명된 쿠키가 설정되었습니다.')
})

// 쿠키 읽기
app.get('/get-cookie', (req, res) => {
   console.log('Cookies:', req.cookies) // 일반 쿠키
   console.log('Signed Cookies:', req.signedCookies) // 서명된 쿠키
   res.send(`쿠키: ${req.cookies.age}, 서명된 쿠키: ${req.signedCookies.user}`)
})

// 쿠키 삭제
app.get('/clear-cookie', (req, res) => {
   res.clearCookie('age')
   res.clearCookie('user')
   res.send('쿠키가 삭제되었습니다!')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
