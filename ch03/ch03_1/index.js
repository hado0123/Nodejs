const express = require('express')
const path = require('path')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   // res.send('안녕! node!')
   res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
