// 파일 스트림을 사용해 파일에 데이터를 쓰는 예제

// 'fs' 모듈을 불러오기
const fs = require('fs')

// 'writeme2.txt' 파일에 데이터를 쓰기 위한 쓰기 스트림 생성
const writeStream = fs.createWriteStream('./writeme2.txt')

// 'finish' 이벤트: 쓰기 스트림이 종료되었을 때 발생
writeStream.on('finish', () => {
   console.log('파일 쓰기 완료') // 쓰기가 완료되면 메시지 출력
})

// 스트림에 데이터를 작성
writeStream.write('이 글을 씁니다.\n') // 첫 번째 데이터 작성
writeStream.write('한 번 더 씁니다.') // 두 번째 데이터 작성

// 스트림 종료 (더 이상 쓸 데이터가 없음을 알림)
writeStream.end()
