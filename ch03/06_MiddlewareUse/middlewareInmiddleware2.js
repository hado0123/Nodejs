const express = require('express')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리
const morgan = require('morgan')

const app = express()
app.set('port', process.env.PORT || 3000)

// 조건부로 morgan 실행
app.use((req, res, next) => {
   console.log(req.path)
   if (req.path.startsWith('/api')) {
      morgan('dev')(req, res, next) // '/api' 경로에서만 morgan 실행
   } else {
      next() // 다른 요청은 건너뛰고 다음 미들웨어로 이동
   }
})

// 라우트
app.get('/', (req, res) => {
   res.send('Welcome to the homepage!')
})

app.get('/api/users', (req, res) => {
   res.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
   ])
})

app.get('/api/products', (req, res) => {
   res.json([
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Phone' },
   ])
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
