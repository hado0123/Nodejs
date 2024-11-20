const express = require('express')

const router = express.Router()

// GET /user 라우터
router.get('/', (req, res) => {
   res.send('Hello, User')
})

// http://localhost:8000/user/test
router.get('/:id', (req, res) => {
   //req.params: path param 값을 가져올때
   //req.query: 쿼리스트링, 주소: http://localhost:8000/user/test?name=haseo&address=구월
   console.log(req.params, req.query)
   res.send('Hello, User ' + req.params.id)
})

/*
router.get('/cate/abc', (req, res) => {
   res.send('GET /user/cate/abc')
})

router.post('/cate/abc', (req, res) => {
   res.send('POST /user/cate/abc')
})

인 경우 아래와 같이 하나로 작성가능
*/

router
   .route('/cate/abc')
   .get((req, res) => {
      res.send('GET /user/cate/abc')
   })
   .post((req, res) => {
      res.send('POST /user/cate/abc')
   })

module.exports = router
