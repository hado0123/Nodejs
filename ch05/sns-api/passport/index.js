const passport = require('passport')
const local = require('./localStrategy')
const { User } = require('../models')

// 📦 Passport 초기화 함수
module.exports = () => {
   // 직렬화(serializeUser)
   // 로그인 성공 후 사용자 정보를 세션에 저장
   passport.serializeUser((user, done) => {
      // 사용자 ID만 세션에 저장 (이때의 user는 로그인 성공 시의 사용자 객체)
      done(null, user.id)
      // done()의 첫 번째 인자는 에러, 두 번째 인자는 세션에 저장할 사용자 식별자 (보통 user.id)
   })

   // 역직렬화(deserializeUser)
   // 세션에 저장된 사용자 ID를 바탕으로 사용자 정보 조회
   passport.deserializeUser((id, done) => {
      User.findOne({
         where: { id }, // 세션에 저장된 사용자 ID로 사용자 정보 조회
         include: [
            {
               model: User,
               attributes: ['id', 'nick'], // 사용자의 팔로워 정보(id, nick)만 가져옴
               as: 'Followers', // 관계의 별칭 (User 모델에 미리 관계를 정의해야 함)
            },
            {
               model: User,
               attributes: ['id', 'nick'], // 사용자의 팔로잉 정보(id, nick)만 가져옴
               as: 'Followings', // 관계의 별칭 (User 모델에 미리 관계를 정의해야 함)
            },
         ],
      })
         .then((user) => done(null, user)) // 사용자 정보 복구 후 done()으로 사용자 정보 반환
         .catch((err) => done(err)) // 에러 발생 시 done()으로 에러 반환
   })

   // 로컬 전략(Local Strategy) 초기화
   local() // localStrategy.js 파일의 함수를 실행하여 Passport에 local 전략을 추가
}
