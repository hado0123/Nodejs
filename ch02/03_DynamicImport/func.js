const { odd, even } = require('./ment') // require함수 안에 불러올 모듈의 경로 작성

function checkOddOrEven(num) {
   if (num % 2 === 0) {
      return even
   } else {
      return odd
   }
}

// 함수를 모듈로 만듬
module.exports = checkOddOrEven
