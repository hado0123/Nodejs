// 로그인 상태 확인 미들웨어
exports.isLoggedIn = (req, res, next) => {
   // 사용자가 인증된 상태인지 확인
   console.log('req.isAuthenticated()', req.isAuthenticated())
   if (req.isAuthenticated()) {
      // 인증된 경우 다음 미들웨어로 이동
      next()
   } else {
      // 인증되지 않은 경우 403 상태와 에러 메시지 반환
      res.status(403).json({
         success: false,
         message: '로그인이 필요합니다.',
      })
   }
}

// 비로그인 상태 확인 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
   // 사용자가 인증되지 않은 상태인지 확인
   if (!req.isAuthenticated()) {
      // 인증되지 않은 경우 다음 미들웨어로 이동
      next()
   } else {
      // 이미 인증된 경우 400 상태와 에러 메시지 반환
      res.status(400).json({
         success: false,
         message: '이미 로그인된 상태입니다.',
      })
   }
}
