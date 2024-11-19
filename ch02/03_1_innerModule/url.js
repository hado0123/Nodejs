const url = require('url') //인터넷 주소를 쉽게 조작할 수 있도록 도와줌

const { URL } = url
const myURL = new URL('https://www.naver.com/')
console.log('new URL():', myURL) //주소를 객체로 분해
console.log('url.format():', url.format(myURL)) //분해되어 있던 주소를 다시 합침
