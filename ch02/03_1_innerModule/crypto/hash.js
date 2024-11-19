//단방향 암호화: 복호화(암호화 한것을 원래대로 되돌려 놓음) 할 수 없는 암호화 방식
//고객의 비밀번호를 암호화 할때 사용

const crypto = require('crypto')

console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'))
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'))
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'))
