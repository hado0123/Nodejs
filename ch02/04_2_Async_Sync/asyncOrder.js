const fs = require('fs')

// 비동기로 하되 순서를 유지하고 싶다면?

/*
비동기- 논블로킹

fs.readFile은 비동기 함수입니다. 파일을 읽는 동안 프로그램의 실행 흐름이 멈추지 않습니다.
하지만 콜백함수를 이용해 순서를 유지할 수 있습니다.
-> 다만 콜백지옥 유발 ->  promise로 해결
*/

console.log('시작')

// 논블로킹(프로세스 멈추지 X), 비동기(콜백함수)
fs.readFile('./readme2.txt', (err, data) => {
   if (err) {
      throw err
   }
   console.log('1번', data.toString())
   // 논블로킹(프로세스 멈추지 X), 비동기(콜백함수)
   fs.readFile('./readme2.txt', (err, data) => {
      if (err) {
         throw err
      }
      console.log('2번', data.toString())
      // 논블로킹(프로세스 멈추지 X), 비동기(콜백함수)
      fs.readFile('./readme2.txt', (err, data) => {
         if (err) {
            throw err
         }
         console.log('3번', data.toString())
         console.log('끝')
      })
   })
})
