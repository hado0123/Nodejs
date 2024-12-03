const express = require('express')
const path = require('path')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

//3. static 미들웨어 사용
// localhost:8000/ 로 들어왔을때
//C:\project\node\ch03\02_Middleware\public 이 경로에서 정적파일을 찾는다
// http://localhost:8000/style.css, http://localhost:8000/dog.png 로 public 폴더의 정적파일에 바로 접근 가능
console.log(__dirname)
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
   res.send('홈 페이지')
})

app.get('/about', (req, res) => {
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
