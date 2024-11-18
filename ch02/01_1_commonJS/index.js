/* 01_CommonJS */

//1. 사용법
const checkNumber = require('./func')

console.log('checkNumber: ', checkNumber(10))
console.log('checkNumber: ', checkNumber(9))

// 2. require 는 함수이고 함수는 객체이므로 require는 객체로서 속성을 가지고 있음
// console.log('require가 가장 위에 오지 않아도 됩니다.')
// require('./01_commonJS/ment')

// console.log(require.main) // require 객체 정보 출력

//3. 순환참조 문제
// const insideDep1 = require('./dep1')
// const insideDep2 = require('./dep2')

// insideDep1()
// insideDep2()
