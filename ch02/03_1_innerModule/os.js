const os = require('os') //운영체제 정보를 얻어오는 모듈

console.log('운영체제 정보---------------------------------')
console.log('os.arch():', os.arch())
console.log('os.platform():', os.platform())
console.log('os.type():', os.type()) //운영체제 종류
console.log('os.uptime():', os.uptime()) //운영체제 부팅이후 흐른 시간
console.log('os.hostname():', os.hostname()) //컴퓨터 이름
console.log('os.release():', os.release()) //운영체제 버전

console.log('경로------------------------------------------')
console.log('os.homedir():', os.homedir()) //홈 디렉토리 경로
console.log('os.tmpdir():', os.tmpdir()) //임시파일 저장 경로

console.log('cpu 정보--------------------------------------')
console.log('os.cpus():', os.cpus()) //컴퓨터의 코어 정보
console.log('os.cpus().length:', os.cpus().length)

console.log('메모리 정보-----------------------------------')
console.log('os.freemem():', os.freemem()) //사용가능한 메모리(RAM)을 보여줌
console.log('os.totalmem():', os.totalmem()) //전체 메모리(RAM) 용량
