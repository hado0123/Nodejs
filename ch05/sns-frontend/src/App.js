import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from './features/authSlice'

import './styles/common.css'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) // 로그인 상태 가져오기

   // 애플리케이션 시작 시 로그인 상태 확인
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/my" element={<MyPage auth={user} />} />
            <Route path="/my/:id" element={<MyPage auth={user} />} />
            <Route path="/posts/create" element={<PostCreatePage />} />
            <Route path="/posts/edit/:id" element={<PostEditPage />} />
         </Routes>
      </>
   )
}

export default App
