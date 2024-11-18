const path = require('path') //폴더와 파일의 경로를 조작하도록 도와주는 모듈

const string = __filename

console.log('path.sep:', path.sep) // 경로의 구분자를 알려줌(윈도우는 \, 리눅스 맥 계열은 /)
// console.log('path.delimiter:', path.delimiter) //환경변수의 구분자(윈도우는 세미콜론 리눅스 맥 계열은 콜론)
console.log('------------------------------')
console.log('path.dirname():', path.dirname(string)) // 파일이 위치간 폴더 경로
console.log('path.extname():', path.extname(string)) // 파일의 확장자
console.log('path.basename():', path.basename(string)) // 파일의 이름을 표시
console.log('path.basename - extname:', path.basename(string, '.js')) // 파일의 이름만 표시하고 싶을 경우
console.log('------------------------------')
console.log('path.parse()', path.parse(string)) // 파일 경로를 root, dir..등으로 분리
console.log(
   'path.format():',
   path.format({
      dir: 'C:\\users\\zerocho',
      name: 'path',
      ext: '.js',
   })
) //path.parse한 경로를 합침
console.log('path.normalize():', path.normalize('C://users\\\\zerocho\\path.js')) // 슬래시나 역슬래시를 실수로 사용하거나 여러번 사용했을 경우 정상적인 결과를 줌
console.log('------------------------------')
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\')) //파일의 경로가 절대 경로인지 상대경로 인지 알려줌
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'))
console.log('------------------------------')
console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js', 'C:\\')) // 경로 두개 중 첫 번째 경로에서 두번째 경로로 가는 법을 알려줌
console.log('path.join():', path.join('C:project/node', '/users', '/zerocho')) // 여러 인수를 넣으면 하나의 경로로 합침
