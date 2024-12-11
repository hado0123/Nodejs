import React, { useState, useMemo, useCallback } from 'react'
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
   const [email, setEmail] = useState('') // 이메일 상태
   const [password, setPassword] = useState('') // 비밀번호 상태
   const dispatch = useDispatch() // Redux 디스패치 함수
   const navigate = useNavigate() // 페이지 이동을 위한 useNavigate 훅
   const { loading, error } = useSelector((state) => state.auth) // Redux 상태에서 로딩 및 에러 가져오기

   // useCallback을 사용하여 handleLogin 함수를 메모이제이션
   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (email.trim() && password.trim()) {
            dispatch(loginUserThunk({ email, password }))
               .unwrap()
               .then(() => navigate('/')) // 로그인 성공 시 메인 페이지로 이동
               .catch((error) => console.error('로그인 실패:', error)) // 로그인 실패 시 에러 출력
         }
      },
      [dispatch, email, password, navigate]
   ) // 의존성 배열에 필요한 값 추가

   // useMemo를 사용하여 로그인 버튼의 내용을 메모이제이션
   const loginButtonContent = useMemo(
      () =>
         loading ? (
            <CircularProgress
               size={24}
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
               }}
            />
         ) : (
            '로그인'
         ),
      [loading]
   ) // 로딩 상태가 변경될 때만 버튼 내용이 다시 렌더링됨

   return (
      <Container maxWidth="sm">
         <Typography variant="h4" gutterBottom>
            로그인
         </Typography>

         {error && (
            <Typography color="error" align="center">
               {error}
            </Typography>
         )}

         <form onSubmit={handleLogin}>
            <TextField label="이메일" name="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="비밀번호" type="password" name="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading} sx={{ position: 'relative', marginTop: '20px' }}>
               {loginButtonContent}
            </Button>
         </form>

         <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
         </p>
      </Container>
   )
}

export default Login
