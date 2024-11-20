const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')

require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 업로드 폴더 확인 및 생성
try {
   fs.readdirSync('uploads') // uploads 폴더가 있는지 확인
} catch (error) {
   console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads') // uploads 폴더가 없으면 생성
}

// Multer 설정
const upload = multer({
   storage: multer.diskStorage({
      // 업로드 파일 저장 경로 설정
      destination(req, file, done) {
         done(null, 'uploads/') // uploads 폴더에 저장
      },
      // 저장할 파일 이름 설정
      filename(req, file, done) {
         const ext = path.extname(file.originalname) // 파일 확장자 추출
         console.log('ext: ', ext)
         console.log('path.basename(file.originalname, ext): ', path.basename(file.originalname, ext))
         // 파일 이름 = 원본 이름 (확장자 제외) + 현재 시간 + 확장자
         done(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한 (5MB)
})

// GET /upload 요청 처리: 파일 업로드를 위한 HTML 폼 제공
app.get('/upload', (req, res) => {
   res.sendFile(path.join(__dirname, 'multipart.html')) // multipart.html 파일 응답
})

// POST /upload 요청 처리: 단일 파일 업로드
app.post('/upload', upload.array('many'), (req, res) => {
   console.log(req.files, req.body) // 업로드된 파일 정보 출력
   res.send('ok') // 클라이언트에 응답
})

// GET / 요청 처리: 일반 요청 처리와 에러 처리 데모
app.get(
   '/',
   (req, res, next) => {
      console.log('GET / 요청에서만 실행됩니다.')
      next() // 2번째 콜백함수 실행(일부러 에러 유발)
   },
   (req, res) => {
      throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
   }
)
app.use((err, req, res, next) => {
   console.error(err)
   res.status(500).send(err.message) // 클라이언트에 에러 메시지 응답
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
