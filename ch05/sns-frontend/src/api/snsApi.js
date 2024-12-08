import axios from 'axios'

// 서버의 기본 URL 설정
const BASE_URL = 'http://localhost:8000'

// Axios 인스턴스 생성
const snsApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true, // 세션 쿠키를 요청에 포함
})

// 공통 API 호출 함수
const fetchFromApi = async (url, method = 'GET', data = {}) => {
   try {
      const response = await snsApi.request({
         url,
         method,
         data,
      })
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

// 회원가입 API
export const registerUser = (userData) => {
   return fetchFromApi('/auth/join', 'POST', userData)
}

// 로그인 API
export const loginUser = (credentials) => {
   return fetchFromApi('/auth/login', 'POST', credentials)
}

// 로그아웃 API
export const logoutUser = () => {
   return fetchFromApi('/auth/logout', 'GET')
}

//로그인 체크
export const checkAuthStatus = () => {
   return fetchFromApi('/auth/status', 'GET')
}

export default snsApi
