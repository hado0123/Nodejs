// 파일을 스트림 방식으로 복사하면서 메모리 사용량을 확인하는 예제
// 스트림 방식 사용시 메모리를 62MB만 사용

// 'fs' 모듈 불러오기
const fs = require('fs')

// 현재 메모리 사용량 확인 (RSS: Resident Set Size - 프로세스가 사용 중인 메모리)
console.log('before: ', process.memoryUsage().rss)

// 'big.txt' 파일을 읽기 위한 읽기 스트림 생성
const readStream = fs.createReadStream('./big.txt')

// 'big3.txt' 파일에 데이터를 쓰기 위한 쓰기 스트림 생성
const writeStream = fs.createWriteStream('./big3.txt')

// 읽기 스트림과 쓰기 스트림을 연결하여 데이터를 복사 (스트림 방식)
readStream.pipe(writeStream)

// 읽기 스트림이 완료된 후 메모리 사용량 확인
readStream.on('end', () => {
   console.log('stream: ', process.memoryUsage().rss)
})
