// 파일을 동기적으로 복사하면서 메모리 사용량을 확인하는 예제
// 처음에 18MB 였던 메모리 사용량이 순식간에 1GB를 넘김

// 'fs' 모듈 불러오기
const fs = require('fs')

// 현재 메모리 사용량 확인 (RSS: Resident Set Size - 프로세스가 사용 중인 메모리)
console.log('before: ', process.memoryUsage().rss)

// 'big.txt' 파일을 동기적으로 읽어들임
const data1 = fs.readFileSync('./big.txt')

// 읽어들인 데이터를 'big2.txt' 파일에 동기적으로 쓰기
fs.writeFileSync('./big2.txt', data1)

// 파일 읽기 및 쓰기 작업 후 메모리 사용량 다시 확인
console.log('buffer: ', process.memoryUsage().rss)
