// Buffer 객체를 생성하고 다양한 메서드를 사용하는 예제

// '저를 버퍼로 바꿔보세요' 문자열을 Buffer 객체로 변환
const buffer = Buffer.from('저를 버퍼로 바꿔보세요')
console.log('from():', buffer) // Buffer 객체 출력
console.log('length:', buffer.length) // Buffer의 길이 출력 (문자열을 UTF-8로 인코딩했을 때의 바이트 수)
console.log('toString():', buffer.toString()) // Buffer를 다시 문자열로 변환하여 출력

// 여러 Buffer 객체를 배열로 생성
const array = [
   Buffer.from('띄엄 '), // 첫 번째 Buffer 객체
   Buffer.from('띄엄 '), // 두 번째 Buffer 객체
   Buffer.from('띄어쓰기'), // 세 번째 Buffer 객체
]

// Buffer.concat() 메서드를 사용해 Buffer 배열을 하나의 Buffer로 병합
const buffer2 = Buffer.concat(array)
console.log('concat():', buffer2.toString()) // 병합된 Buffer를 문자열로 변환하여 출력

// Buffer.alloc()로 고정된 크기의 빈 Buffer 생성 (초기값은 0으로 채워짐)
const buffer3 = Buffer.alloc(5)
console.log('alloc():', buffer3) // 크기가 5인 Buffer 객체 출력
