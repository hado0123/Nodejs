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

//특정 포스트 가져오기
export const getPostById = (id) => {
   return fetchFromApi(`/post/${id}`, 'GET')
}

//포스트 가져오기
export const getPosts = () => {
   return fetchFromApi('/post', 'GET')
}

//포스트 등록
export const createPost = async (postData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      // 이미지 업로드 중
      const response = await snsApi.post('/post', postData, config) // api 통신
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

//포스트 수정
export const updatePost = async (id, postData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      // 이미지 업로드 중
      const response = await snsApi.put(`/post/${id}`, postData, config) // api 통신
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }

   // return fetchFromApi('/post', 'PUT', postData)
}

//포스트 삭제
export const deletePost = async (id) => {
   try {
      const response = await snsApi.delete(`/post/${id}`, 'DELETE') // api 통신
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

export default snsApi
