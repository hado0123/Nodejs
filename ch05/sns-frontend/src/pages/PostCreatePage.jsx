import React from 'react'
import { useDispatch } from 'react-redux'
import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createPostThunk } from '../features/postSlice' // Thunk 액션 import

const PostCreatePage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // 게시물 등록 핸들러
   const handleSubmit = (postData) => {
      dispatch(createPostThunk(postData)) // Thunk로 데이터 전송
         .unwrap() // Thunk의 결과를 추출
         .then((response) => {
            alert('게시물이 성공적으로 등록되었습니다!')
            navigate('/posts')
         })
         .catch((error) => {
            console.error('게시물 등록 중 오류 발생:', error)
            alert('게시물 등록에 실패했습니다.')
         })
   }

   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         <PostForm onSubmit={handleSubmit} />
      </Container>
   )
}

export default PostCreatePage
