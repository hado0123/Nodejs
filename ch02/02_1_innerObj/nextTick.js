setImmediate(() => {
   console.log('immediate')
})

process.nextTick(() => {
   console.log('nextTick')
})

setTimeout(() => {
   console.log('timeout')
}, 0)

Promise.resolve().then(() => console.log('promise'))

// process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.
// resolve된 Promise 객체도 nextTick 처럼 setImmediate나 setTimeout보다 먼저 실행된다.
