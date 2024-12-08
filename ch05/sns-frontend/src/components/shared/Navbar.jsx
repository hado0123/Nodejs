import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk, checkAuthStatusThunk } from '../../features/authSlice'
import { useEffect } from 'react'

const Navbar = () => {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   // 새로고침 시 로그인 상태 확인
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   const handleLogout = () => {
      dispatch(logoutUserThunk())
   }

   return (
      <AppBar position="static" style={{ backgroundColor: '#fff' }}>
         <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
               <Link to="/">
                  <img src="/images/logo.png" alt="로고" width="160" style={{ display: 'inline-block', marginTop: '15px' }} />
               </Link>
            </Typography>

            {isAuthenticated ? (
               <>
                  <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                     {user?.nick}님 환영합니다.
                  </Typography>
                  <Button onClick={handleLogout} variant="outlined">
                     로그아웃
                  </Button>
               </>
            ) : (
               <Link to="/login">
                  <Button variant="contained">로그인</Button>
               </Link>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
