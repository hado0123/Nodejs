const fs = require('fs').promises

fs.writeFile('./writeme.txt', '글이 입력됩니다')
   .then(() => {
      console.log('파일 쓰기 완료')
      return fs.readFile('./writeme.txt')
   })
   .then((data) => {
      console.log(data.toString())
   })
   .catch((err) => {
      console.error('파일 처리 중 오류 발생:', err)
   })
