import React, { useEffect } from 'react'
import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById, updatePostThunk } from '../features/postSlice'

const PostEditPage = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // Redux 상태 선택
   const { post, loading, error } = useSelector((state) => ({
      post: state.posts.posts.find((p) => p.id === Number(id)), // 특정 ID의 게시물 선택
      loading: state.posts.loading,
      error: state.posts.error,
   }))

   // 게시물 데이터 불러오기
   useEffect(() => {
      dispatch(fetchPostById(id))
   }, [dispatch, id])

   // 게시물 수정 핸들러
   const handleSubmit = (postData) => {
      dispatch(updatePostThunk({ id, ...postData }))
         .unwrap()
         .then(() => {
            alert('게시물이 성공적으로 수정되었습니다!')
            navigate('/posts')
         })
         .catch((error) => {
            console.error('게시물 수정 중 오류 발생:', error)
            alert('게시물 수정에 실패했습니다.')
         })
   }

   if (loading) return <p>로딩 중...</p> // 로딩 상태
   if (error) return <p>오류 발생: {error}</p> // 에러 상태

   return (
      <Container maxWidth="md">
         <h1>게시물 수정</h1>
         {post && <PostForm onSubmit={handleSubmit} initialValues={post} />}
      </Container>
   )
}

export default PostEditPage
