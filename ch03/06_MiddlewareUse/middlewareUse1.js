const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

// 동시에 여러개의 미들웨어 사용 가능
app.use(morgan('dev'), express.static(path.join(__dirname, 'public')), express.json(), express.urlencoded({ extended: false }), cookieParser('my-secret-key'))

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
