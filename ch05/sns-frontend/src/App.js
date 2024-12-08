import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
         </Routes>
      </>
   )
}

export default App
