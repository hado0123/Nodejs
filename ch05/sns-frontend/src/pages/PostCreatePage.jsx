import React from 'react'
import { useDispatch } from 'react-redux'
import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createPostThunk } from '../features/postSlice'
import { useCallback } from 'react'

const PostCreatePage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // 게시물 등록 핸들러
   const handleSubmit = useCallback(
      (postData) => {
         dispatch(createPostThunk(postData)) // Thunk로 데이터 전송
            .unwrap() // Thunk의 결과를 추출
            .then(() => {
               navigate('/') // 게시물 등록 후 메인 페이지로 이동
            })
            .catch((error) => {
               console.error('게시물 등록 중 오류 발생:', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch, navigate]
   ) // 의존성 배열에 필요한 값 추가

   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         <PostForm onSubmit={handleSubmit} />
      </Container>
   )
}

export default PostCreatePage
