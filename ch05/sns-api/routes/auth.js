const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { User } = require('../models')

const router = express.Router()

// 회원가입 라우트
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   const { email, nick, password } = req.body // 요청 본문에서 이메일, 닉네임, 비밀번호 추출
   try {
      // 이메일로 기존 사용자 검색
      const exUser = await User.findOne({ where: { email } })
      if (exUser) {
         // 이미 사용자가 존재할 경우 409 상태 코드와 메시지 반환
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자입니다.',
         })
      }
      // 비밀번호를 해시 처리
      const hash = await bcrypt.hash(password, 12)
      // 새로운 사용자 생성
      const newUser = await User.create({
         email,
         nick,
         password: hash,
      })
      // 성공 응답 반환
      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (error) {
      console.error(error)
      // 서버 에러 발생 시 500 상태 코드와 메시지 반환
      res.status(500).json({
         success: false,
         message: '회원가입 중 오류가 발생했습니다.',
         error,
      })
   }
})

// 로그인 라우트
router.post('/login', isNotLoggedIn, (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         return res.status(500).json({ success: false, message: '인증 중 오류 발생', error: authError })
      }

      if (!user) {
         // 비밀번호 불일치 또는 사용자 없음의 경우, info.message를 사용하여 메시지 전달
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         })
      }

      req.login(user, (loginError) => {
         if (loginError) {
            return res.status(500).json({ success: false, message: '로그인 중 오류 발생', error: loginError })
         }

         res.json({
            success: true,
            message: '로그인 성공',
            user: {
               id: user.id,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

// 로그아웃 라우트
router.get('/logout', isLoggedIn, (req, res) => {
   // 로그아웃 처리
   req.logout((err) => {
      if (err) {
         console.error(err)
         // 로그아웃 과정에서 에러 발생 시 500 상태 코드와 메시지 반환
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }

      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

// 로그인 상태 확인 API
router.get('/status', (req, res) => {
   if (req.isAuthenticated()) {
      res.json({
         isAuthenticated: true,
         user: req.user,
      })
   } else {
      res.json({
         isAuthenticated: false,
      })
   }
})

module.exports = router
