const a = false

/*
if (a) {
   import './func.mjs' // ES 모듈은 if문 안에서 사용 불가능
}
*/

// 따라서 아래와 같이 다이나믹 import를 사용해 수정

if (a) {
   // import는 promise 객체를 반환하므로 await 사용가능
   // ES 모듈의 최상위 스코프에서는 async가 없어도 await 사용 가능
   await import('./func.mjs')
}

console.log('성공')
