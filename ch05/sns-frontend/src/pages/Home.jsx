import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography } from '@mui/material'
import PostItem from '../components/post/PostItem'
import { fetchPostsThunk } from '../features/postSlice'

const Home = () => {
   const dispatch = useDispatch()
   const { posts, loading, error } = useSelector((state) => state.posts)

   useEffect(() => {
      dispatch(fetchPostsThunk())
   }, [dispatch])

   return (
      <Container maxWidth="sm">
         <Typography variant="h4" align="center" gutterBottom>
            홈 피드
         </Typography>

         {loading && (
            <Typography variant="body1" align="center">
               로딩 중...
            </Typography>
         )}
         {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생: {error}
            </Typography>
         )}

         {posts.length > 0
            ? posts.map((post) => <PostItem key={post.id} post={post} />)
            : !loading && (
                 <Typography variant="body1" align="center">
                    게시물이 없습니다.
                 </Typography>
              )}
      </Container>
   )
}

export default Home
