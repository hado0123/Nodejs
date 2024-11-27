// npm install express sequelize mysql2 dotenv morgan
// npm install --save-dev nodemon
const express = require('express')
const morgan = require('morgan')
const { sequelize, Post } = require('./models')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.set('port', process.env.PORT || 5000)

app.use(morgan('dev'))

// 데이터베이스 연결
sequelize
   .sync({ force: false }) // force: true => 기존 데이터 초기화
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err)
   })

// 라우터
app.get('/posts', async (req, res) => {
   try {
      const posts = await Post.findAll()
      res.json(posts)
   } catch (error) {
      res.status(500).json({ message: '게시글을 불러오는 데 실패했습니다.' })
   }
})

// 서버 시작
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중')
})
