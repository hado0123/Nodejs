// 폴더와 파일을 관리하는 비동기 작업 예제

// 'fs' 모듈의 프로미스 기반 API와 파일 시스템 상수 가져오기
const fs = require('fs').promises
const constants = require('fs').constants

// './folder'에 대한 접근 권한 확인
// './folder'에 대한 접근 권한 확인
// F_OK: 파일 존재 여부, W_OK: 쓰기 권한 여부, R_OK: 읽기 권한 여부가 있는지 확인
// 권한이 없다면 에러 발생
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
   .then(() => {
      // 폴더가 이미 있는 경우 에러 처리
      return Promise.reject('이미 폴더 있음')
   })
   .catch((err) => {
      if (err.code === 'ENOENT') {
         // 폴더가 없는 경우
         console.log('폴더 없음')
         // 폴더 생성
         return fs.mkdir('./folder')
      }
      // 다른 에러는 그대로 전달
      return Promise.reject(err)
   })
   .then(() => {
      // 폴더 생성이 성공했을 때
      console.log('폴더 만들기 성공')
      // './folder/file.js'라는 빈 파일 생성 (쓰기 모드 'w')
      //두번째 인수(어떤 동작으로 파일을 만들건지) => w:쓰기모드, r:읽기모드, a:기존 파일에 추가
      return fs.open('./folder/file.js', 'w')
   })
   .then((fd) => {
      // 파일 생성이 성공했을 때
      console.log('빈 파일 만들기 성공', fd)
      // 생성한 파일의 이름을 'newfile.js'로 변경
      return fs.rename('./folder/file.js', './folder/newfile.js')
   })
   .then(() => {
      // 파일 이름 변경이 성공했을 때
      console.log('이름 바꾸기 성공')
   })
   .catch((err) => {
      // 모든 단계에서 발생한 에러를 처리
      console.error(err)
   })
