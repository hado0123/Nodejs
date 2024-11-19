function longRunningTask() {
   //오래걸리는 작업..

   console.log('작업끝')
}

console.log('시작')
setTimeout(longRunningTask, 0)
console.log('다음작업')
