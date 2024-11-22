// 폴더와 파일을 삭제하는 비동기 작업 예제

// 'fs' 모듈의 프로미스 기반 API 불러오기
const fs = require('fs').promises

// './folder' 디렉터리 내용 확인
fs.readdir('./folder')
   .then((dir) => {
      // 디렉터리의 파일 및 하위 폴더 목록 출력
      console.log('폴더 내용 확인', dir)
      // './folder/newfile.js' 파일 삭제
      return fs.unlink('./folder/newfile.js')
   })
   .then(() => {
      // 파일 삭제 성공 메시지 출력
      console.log('파일 삭제 성공')
      // 폴더 삭제
      return fs.rmdir('./folder')
   })
   .then(() => {
      // 폴더 삭제 성공 메시지 출력
      console.log('폴더 삭제 성공')
   })
   .catch((err) => {
      // 모든 단계에서 발생한 에러를 처리
      console.error(err)
   })
