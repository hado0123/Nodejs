const fs = require('fs')

fs.writeFile('./writeme.txt', '글이 입력됩니다', (err) => {
   if (err) {
      throw err
   }
   //파일 작성 후 읽어오기
   fs.readFile('./writeme.txt', (err, data) => {
      if (err) {
         throw err
      }
      console.log(data.toString())
   })
})
