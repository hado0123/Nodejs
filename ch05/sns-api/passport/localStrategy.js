const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { User } = require('../models')

// Passport Local Strategy 설정
module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            usernameField: 'email', // 로그인 요청에서 사용할 필드 이름 (여기서는 email)
            passwordField: 'password', // 로그인 요청에서 사용할 비밀번호 필드 이름
         },
         // 실제 인증 로직
         async (email, password, done) => {
            try {
               // 이메일로 사용자 조회
               const exUser = await User.findOne({ where: { email } })
               if (exUser) {
                  // 비밀번호 비교 (bcrypt를 사용하여 저장된 해시와 입력값 비교)
                  const result = await bcrypt.compare(password, exUser.password)
                  if (result) {
                     // 비밀번호가 일치하면 사용자 객체 반환
                     done(null, exUser)
                  } else {
                     // 비밀번호가 틀린 경우
                     done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                  }
               } else {
                  // 이메일에 해당하는 사용자가 없는 경우
                  done(null, false, { message: '가입되지 않은 회원입니다.' })
               }
            } catch (error) {
               // 인증 중 에러 발생 시
               console.error(error)
               done(error) // 에러 객체 전달
            }
         }
      )
   )
}
