// 파일을 gzip 형식으로 압축하는 예제

// 'zlib' 모듈과 'fs' 모듈 불러오기
const zlib = require('zlib')
const fs = require('fs')

// 'readme4.txt' 파일을 읽기 위한 읽기 스트림 생성
const readStream = fs.createReadStream('./readme4.txt')

// gzip 압축을 수행하기 위한 변환 스트림 생성
const zlibStream = zlib.createGzip()

// 압축된 데이터를 저장하기 위한 쓰기 스트림 생성
const writeStream = fs.createWriteStream('./readme4.txt.gz')

// 읽기 스트림 -> 압축 스트림 -> 쓰기 스트림으로 데이터 전달 (파이핑 처리)
// 1. 'readme4.txt'의 내용을 읽어서
// 2. gzip 형식으로 압축하고
// 3. 'readme4.txt.gz' 파일에 저장
readStream.pipe(zlibStream).pipe(writeStream)
