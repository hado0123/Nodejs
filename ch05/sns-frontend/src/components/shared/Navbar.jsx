import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'

const Navbar = ({ isAuthenticated, user }) => {
   const dispatch = useDispatch()

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
                  <Link to="/posts/create">
                     <IconButton aria-label="글쓰기">
                        <CreateIcon />
                     </IconButton>
                  </Link>
                  <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                     {user?.nick}님
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
