const jwt = require('jsonwebtoken')

// 로그인 상태 확인 미들웨어
exports.isLoggedIn = (req, res, next) => {
   // 사용자가 인증된 상태인지 확인
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

// exports.verifyToken = (req, res, next) => {
//   try {
//     req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
//     return next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') { // 유효기간 초과
//       return res.status(419).json({
//         code: 419,
//         message: '토큰이 만료되었습니다',
//       });
//     }
//     return res.status(401).json({
//       code: 401,
//       message: '유효하지 않은 토큰입니다',
//     });
//   }
// };

// exports.apiLimiter = new RateLimit({
//    windowMs: 60 * 1000, // 1분
//    max: 10,
//    delayMs: 0,
//    handler(req, res) {
//       res.status(this.statusCode).json({
//          code: this.statusCode, // 기본값 429
//          message: '1분에 한 번만 요청할 수 있습니다.',
//       })
//    },
// })

// exports.deprecated = (req, res) => {
//    res.status(410).json({
//       code: 410,
//       message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.',
//    })
// }
