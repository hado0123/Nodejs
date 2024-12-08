import React, { useState } from 'react'
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate() // 🔥 useNavigate 훅 추가
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = () => {
      if (email.trim() && password.trim()) {
         dispatch(loginUserThunk({ email, password }))
            .unwrap()
            .then(() => {
               // 🔥 로그인 성공 시 / 경로로 이동
               navigate('/')
            })
            .catch((error) => {
               console.error('로그인 실패:', error)
            })
      }
   }

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

         <TextField label="이메일" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
         <TextField label="비밀번호" variant="outlined" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
         <Button variant="contained" color="primary" onClick={handleLogin} fullWidth disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? <CircularProgress size={24} /> : '로그인'}
         </Button>

         <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
         </p>
      </Container>
   )
}

export default Login
