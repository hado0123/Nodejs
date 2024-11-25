// npm install express sequelize cors mysql2 dotenv body-parser morgan
// npm install --save-dev nodemon
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { sequelize, Post } = require('./models')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()
app.set('port', process.env.PORT || 5000)

// 미들웨어
app.use(morgan('dev'))
app.use(cors()) // React 프론트엔드와 통신 허용
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

app.post('/posts', async (req, res) => {
   try {
      const { title, content, author } = req.body
      const post = await Post.create({ title, content, author })
      res.status(201).json(post)
   } catch (error) {
      res.status(500).json({ message: '게시글 생성에 실패했습니다.' })
   }
})

app.put('/posts/:id', async (req, res) => {
   try {
      const { id } = req.params
      const { title, content, author } = req.body
      const post = await Post.findByPk(id)
      if (post) {
         post.title = title
         post.content = content
         post.author = author
         await post.save()
         res.json(post)
      } else {
         res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
      }
   } catch (error) {
      res.status(500).json({ message: '게시글 수정에 실패했습니다.' })
   }
})

app.delete('/posts/:id', async (req, res) => {
   try {
      const { id } = req.params
      const post = await Post.findByPk(id)
      if (post) {
         await post.destroy()
         res.json({ message: '게시글이 삭제되었습니다.' })
      } else {
         res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
      }
   } catch (error) {
      res.status(500).json({ message: '게시글 삭제에 실패했습니다.' })
   }
})

// 서버 시작
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중')
})
