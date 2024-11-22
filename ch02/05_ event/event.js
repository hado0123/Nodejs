// 'events' 모듈을 사용해 이벤트를 처리하는 예제

// 'events' 모듈 불러오기
const EventEmitter = require('events')

// EventEmitter 인스턴스 생성
const myEvent = new EventEmitter()

// 'event1' 리스너 추가
myEvent.addListener('event1', () => {
   console.log('이벤트 1')
})

// 'event2'에 리스너 두 개 추가
myEvent.on('event2', () => {
   console.log('이벤트 2')
})
myEvent.on('event2', () => {
   console.log('이벤트 2 추가')
})

// 'event3' 리스너 추가 (한 번만 실행됨)
myEvent.once('event3', () => {
   console.log('이벤트 3')
})

// 이벤트 호출
myEvent.emit('event1') // '이벤트 1' 출력
myEvent.emit('event2') // '이벤트 2'와 '이벤트 2 추가' 출력

myEvent.emit('event3') // '이벤트 3' 출력
myEvent.emit('event3') // 실행 안 됨 (once로 등록된 이벤트)

// 'event4' 리스너 추가
myEvent.on('event4', () => {
   console.log('이벤트 4')
})

// 'event4'의 모든 리스너 제거
myEvent.removeAllListeners('event4')
myEvent.emit('event4') // 실행 안 됨 (리스너 제거됨)

// 'event5' 리스너를 변수에 할당 후 추가
const listener = () => {
   console.log('이벤트 5')
}
myEvent.on('event5', listener)

// 'event5' 리스너 제거
myEvent.removeListener('event5', listener)
myEvent.emit('event5') // 실행 안 됨 (리스너 제거됨)

// 'event2'의 리스너 개수 출력
console.log(myEvent.listenerCount('event2')) // 2 (두 개의 리스너가 등록됨)
