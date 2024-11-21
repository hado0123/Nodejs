const fs = require('fs')

/*
 동기 - 블로킹

 readFileSync는 동기 함수 이고 파일을 다 읽을때 까지 프로세스가 멈춥니다.
*/
console.log('시작') // 동기

let data = fs.readFileSync('./readme2.txt') // 블로킹 (프로세스 멈춤), 동기
console.log('1번', data.toString()) // 동기

data = fs.readFileSync('./readme2.txt') // 블로킹 (프로세스 멈춤), 동기
console.log('2번', data.toString()) // 동기

data = fs.readFileSync('./readme2.txt') // 블로킹 (프로세스 멈춤), 동기
console.log('3번', data.toString()) // 동기

console.log('끝') // 동기
