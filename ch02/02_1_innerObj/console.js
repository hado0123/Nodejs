const string = 'abc'
const number = 1
const boolean = true
const obj = {
   outside: {
      inside: {
         key: 'value',
      },
   },
}
console.time('전체시간') //time과 timeEnd사이의 시간을 측정
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다')
console.log(string, number, boolean)
console.error('에러 메시지는 console.error에 담아주세요') //에러 표시

//배열의 요소로 객체를 넣으면 객체의 속성들이 테이블 형식으로 표시
console.table([
   { name: '제로', birth: 1994 },
   { name: 'hero', birth: 1988 },
])

//객체를 콘솔에 표시할때 사용: 첫번째 인수로 표시할 객체, 두번째 인수로 옵션
console.dir(obj, { colors: false, depth: 2 })
console.dir(obj, { colors: true, depth: 1 })

console.time('시간측정')
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간측정')

function b() {
   console.trace('에러 위치 추적') //에러가 어디서 발생했는지 추척하게 해줌. 에러발생시 위치를 알려주지 않을 경우 사용하기 좋음
}

function a() {
   b()
}
a()

console.timeEnd('전체시간')
