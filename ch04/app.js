// npm install express sequelize mysql2 dotenv morgan
// npm install --save-dev nodemon
const express = require('express') // Express 모듈 불러오기
const path = require('path') // 파일 경로를 다루는 Node.js 내장 모듈
const morgan = require('morgan') // HTTP 요청 로깅 미들웨어
const dotenv = require('dotenv') // 환경 변수 관리 라이브러리
const { sequelize } = require('./models') // Sequelize를 통해 데이터베이스 연결

// 라우터 모듈 불러오기
const indexRouter = require('./routes')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')

dotenv.config()

const app = express()
app.set('port', process.env.PORT || 5000)

// 데이터베이스 연결 설정
sequelize
   .sync({ force: false }) // force: true는 기존 테이블 초기화를 의미 (주의!)
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err) // 연결 실패 시 에러 출력
   })

// 공통 미들웨어 설정
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public'))) // 정적 파일 제공
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 라우터 연결
app.use('/', indexRouter) // 기본 경로 라우터
app.use('/users', usersRouter) // /users 경로 라우터
app.use('/comments', commentsRouter) // /comments 경로 라우터

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) // 요청 경로에 해당하는 라우터 없음
   error.status = 404 // 404 상태 코드 설정
   next(error) // 다음 에러 처리기로 전달
})

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
   const status = err.status || 500 // 상태 코드 설정
   const message = err.message || '서버 에러' // 에러 메시지 설정

   // 에러 정보를 브라우저로 직접 전달
   res.status(status).send(`
      <h1>Error ${status}</h1>
      <p>${message}</p>
      ${process.env.NODE_ENV !== 'production' ? `<pre>${err.stack}</pre>` : ''}
   `) //개발환경에서만 에러정보를 노출
})
// 서버 시작
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중')
})
