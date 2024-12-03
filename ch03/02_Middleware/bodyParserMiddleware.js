const express = require('express')
const path = require('path')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/submit.html'))
})

//4. body-parser 미들웨어: request 본문을 쉽게 처리할 수 있도록 도와주는 미들웨어
// 요청 데이터를 josin 객체로 받아올 수 있게 한다
app.use(express.json())

// URL-encoded 요청 본문 처리
/* application/x-www-form-urlencoded 형식은 HTML <form>에서 데이터를 전송할 때 기본적으로 사용되는 데이터 형식. 
데이터를 key=value&key2=value2의 형태로 인코딩하여 요청 본문에 포함.

예) HTML <form> 데이터를 URL-encoded 방식으로 전송:
<form method="POST" action="/submit">
  <input type="text" name="name" value="Alice">
  <input type="text" name="age" value="30">
  <button type="submit">Submit</button>
</form>

전송된 요청 본문
name=Alice&age=30
*/
app.use(express.urlencoded({ extended: true }))

app.post('/submit', (req, res) => {
   // request, response 할때는 header + body 형태로 데이터가 전송된다.
   // header영역: request, response 정보가 들어있음
   // body 영역: 데이터가 들어있음
   console.log(req.body) // form 태그에서 입력한 데이터가 들어있음
   res.send('데이터 수신 완료!')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
