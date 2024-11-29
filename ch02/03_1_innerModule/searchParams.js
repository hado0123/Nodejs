const { URL } = require('url')

// 쿼리 스트링을 다루는 searchParams
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript')
console.log('searchParams:', myURL.searchParams)
console.log('searchParams.getAll():', myURL.searchParams.getAll('category')) // 키에 해당하는 모든 값을 가져온다.
console.log('searchParams.get():', myURL.searchParams.get('limit')) // 키에 해당하는 첫번재 값만 가져온다.
console.log('searchParams.has():', myURL.searchParams.has('page')) // 해당키가 있는지 없는지 검사

console.log('키와 값을 가져옴-----------------------')
console.log('searchParams.keys():', myURL.searchParams.keys()) // 모든 키를 Iterator 객체로 가져온다
console.log('searchParams.values():', myURL.searchParams.values()) // 모든 값을 Iterator 객체로 가져온다

console.log('키와 값을 추가------------------------')
myURL.searchParams.append('filter', 'es3') // 키, 값을 추가
console.log(myURL.searchParams.getAll('filter'))
myURL.searchParams.delete('filter') //키를 제거
console.log(myURL.searchParams.getAll('filter'))

console.log('searchParams.toString():', myURL.searchParams.toString()) //searchParams객체를 다시 문자열로 만듬
