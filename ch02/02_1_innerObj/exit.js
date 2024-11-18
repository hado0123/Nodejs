let i = 1
//1 초에 한번씩 1를 1씩 증가시킴
setInterval(() => {
   if (i === 5) {
      console.log('종료!')
      process.exit() // i가 5가 되면 프로그램(프로세스)을 종료시킨다 -> 서버가 아예 멈추게 되므로 잘 사용하지는 않음
   }
   console.log(i)
   i += 1
}, 1000)
