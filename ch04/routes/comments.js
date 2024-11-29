const express = require('express')
const { Comment } = require('../models')

const router = express.Router()
//localhost:8000/comments -> hoppscotch 사용
// 새로운 댓글 생성
router.post('/', async (req, res, next) => {
   try {
      const comment = await Comment.create({
         commenter: req.body.id, // 댓글 작성자 ID
         comment: req.body.comment, // 댓글 내용
      })
      console.log(comment) // 생성된 댓글 로그 출력
      res.status(201).json(comment) // 상태 코드 201과 함께 생성된 댓글 JSON 응답
   } catch (err) {
      console.error(err) // 에러 로그 출력
      next(err) // 에러를 다음 미들웨어로 전달
   }
})

// localhost:8000/comments/2 -> hoppscotch 사용
// 특정 댓글에 대한 수정 및 삭제 처리
router
   .route('/:id')
   // 댓글 수정
   .patch(async (req, res, next) => {
      try {
         const result = await Comment.update(
            {
               comment: req.body.comment, // 수정할 댓글 내용
            },
            {
               where: { id: req.params.id }, // 수정할 댓글의 ID
            }
         )
         if (result[0] === 0) {
            // 수정된 데이터가 없을 경우
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
         }
         res.json({ message: '댓글이 수정되었습니다.', result }) // 성공 응답
      } catch (err) {
         console.error(err) // 에러 로그 출력
         next(err) // 에러를 다음 미들웨어로 전달
      }
   })
   // localhost:8000/comments/2 -> hoppscotch 사용
   // 댓글 삭제
   .delete(async (req, res, next) => {
      try {
         const result = await Comment.destroy({
            where: { id: req.params.id }, // 삭제할 댓글의 ID
         })
         if (result === 0) {
            // 삭제된 데이터가 없을 경우
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
         }
         res.json({ message: '댓글이 삭제되었습니다.', result }) // 성공 응답
      } catch (err) {
         console.error(err) // 에러 로그 출력
         next(err) // 에러를 다음 미들웨어로 전달
      }
   })

module.exports = router
