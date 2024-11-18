/*
const timeout = setTimeout(() => {
  console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
  console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);
*/

//즉시 실행되는 함수
// setImmediate은 기본적으로 setTimeout(콜백함수, 0) 보다 먼저 실행되지만 항상 그렇지는 않다. 따라서 두개를 같이 사용하기를 권장하지X
const immediate = setImmediate(() => {
   console.log('즉시 실행')
})

const immediate2 = setImmediate(() => {
   console.log('실행되지 않습니다')
})

clearImmediate(immediate2)
