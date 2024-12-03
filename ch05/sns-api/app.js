// 필요한 모듈 불러오기
const express = require('express') // Express 웹 프레임워크
const path = require('path') // 경로 처리 유틸리티
const cookieParser = require('cookie-parser') // 쿠키 처리 미들웨어
// const passport = require('passport') // 인증 미들웨어
const morgan = require('morgan') // HTTP 요청 로깅 미들웨어
const session = require('express-session') // 세션 관리 미들웨어
const dotenv = require('dotenv') // 환경 변수 관리

// 환경 변수 설정 파일 로드
dotenv.config()

// 라우터 및 기타 모듈 불러오기
// const v1 = require('./routes/v1') // API v1 라우터
// const v2 = require('./routes/v2') // API v2 라우터
// const authRouter = require('./routes/auth') // 인증 관련 라우터
const indexRouter = require('./routes') // 기본 라우터
const { sequelize } = require('./models') // Sequelize ORM
// const passportConfig = require('./passport') // Passport 설정

// Express 애플리케이션 생성
const app = express()
passportConfig() // Passport 설정 실행

// 포트 설정 (환경 변수에서 가져오거나 기본값 8002 사용)
app.set('port', process.env.PORT || 8002)

// Sequelize를 사용한 데이터베이스 연결
sequelize
   .sync({ force: false }) // force: false => 기존 데이터 유지
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err) // 연결 실패 시 오류 출력
   })

// 미들웨어 설정
app.use(morgan('dev')) // HTTP 요청 로깅 (dev 모드)
app.use(express.static(path.join(__dirname, 'public'))) // 정적 파일 제공
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 데이터 파싱
app.use(cookieParser(process.env.COOKIE_SECRET)) // 쿠키 파싱 및 서명

// 세션 설정
app.use(
   session({
      resave: false, // 세션 데이터 변경 시에만 저장
      saveUninitialized: false, // 초기화되지 않은 세션 저장 안 함
      secret: process.env.COOKIE_SECRET, // 세션 암호화 키
      cookie: {
         httpOnly: true, // 클라이언트에서 쿠키 접근 불가
         secure: false, // HTTPS가 아닐 경우에도 쿠키 사용 가능
      },
   })
)

// Passport 초기화 및 세션 연동
// app.use(passport.initialize()) // Passport 초기화
// app.use(passport.session()) // Passport 세션 연결

// 라우터 등록
// app.use('/v1', v1) // v1 API 라우터 연결
// app.use('/v2', v2) // v2 API 라우터 연결
// app.use('/auth', authRouter) // 인증 관련 라우터 연결
app.use('/', indexRouter) // 기본 라우터 연결

// 없는 라우터 처리 (404 에러)
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) // 에러 메시지 생성
   error.status = 404 // 404 상태 코드 설정
   next(error) // 다음 미들웨어로 에러 전달
})

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
   res.locals.message = err.message // 에러 메시지
   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {} // 개발 환경에서만 에러 출력
   res.status(err.status || 500) // 상태 코드 설정
   res.render('error') // 에러 페이지 렌더링
})

// 서버 시작
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중') // 서버 실행 메시지 출력
})
