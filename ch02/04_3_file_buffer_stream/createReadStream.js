// 파일 스트림을 사용해 파일을 읽는 예제

// 'fs' 모듈을 불러오기
const fs = require('fs')

// 'readme3.txt' 파일을 읽기 위한 스트림 생성
// highWaterMark 옵션으로 한 번에 읽어들일 버퍼 크기를 16바이트로 설정
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 })

// 읽어들인 데이터를 저장할 배열 초기화
const data = []

// 'data' 이벤트: 스트림에서 데이터(chunk)가 들어올 때마다 발생
readStream.on('data', (chunk) => {
   data.push(chunk) // 들어온 데이터를 배열에 추가
   console.log('data :', chunk, chunk.length) // 각 데이터(chunk)와 그 길이를 출력
})

// 'end' 이벤트: 스트림의 읽기가 끝났을 때 발생
readStream.on('end', () => {
   // 저장된 데이터를 합쳐서 문자열로 변환 후 출력
   console.log('end :', Buffer.concat(data).toString())
})

// 'error' 이벤트: 스트림에서 에러가 발생했을 때 발생
readStream.on('error', (err) => {
   console.log('error :', err) // 에러 내용을 출력
})
