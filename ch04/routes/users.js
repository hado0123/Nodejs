const express = require('express')
const User = require('../models/user')
const Comment = require('../models/comment')

const router = express.Router()

//localhost:8000/users
router
   .route('/')
   // GET 요청: 모든 사용자 조회
   .get(async (req, res, next) => {
      try {
         const users = await User.findAll() // 모든 사용자 데이터를 DB에서 조회
         res.json(users) // JSON 형식으로 클라이언트에 응답
      } catch (err) {
         console.error(err) // 에러 로그 출력
         next(err) // 에러를 다음 미들웨어로 전달
      }
   })
   //localhost:8000/users -> hoppscotch 사용
   // POST 요청: 새로운 사용자 생성
   .post(async (req, res, next) => {
      try {
         console.log('req.body', req.body)
         const user = await User.create({
            name: req.body.name, // 클라이언트에서 받은 name
            age: req.body.age, // 클라이언트에서 받은 age
            married: req.body.married, // 클라이언트에서 받은 결혼 여부
         })
         console.log(user) // 생성된 사용자 데이터 출력
         res.status(201).json(user) // 상태 코드 201과 함께 JSON 형식으로 응답
      } catch (err) {
         console.error(err) // 에러 로그 출력
         next(err) // 에러를 다음 미들웨어로 전달
      }
   })

//localhost:8000/users/2/comments
// '/:id/comments' 경로에 대한 GET 요청 처리
router.get('/:id/comments', async (req, res, next) => {
   try {
      const comments = await Comment.findAll({
         include: {
            model: User, // Comment와 연결된 User 모델도 포함
            where: { id: req.params.id }, // 특정 사용자 ID의 댓글만 조회
         },
      })
      console.log(comments) // 조회된 댓글 데이터 출력
      res.json(comments) // JSON 형식으로 클라이언트에 응답
   } catch (err) {
      console.error(err) // 에러 로그 출력
      next(err) // 에러를 다음 미들웨어로 전달
   }
})

module.exports = router
