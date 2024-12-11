import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography, Pagination, Stack } from '@mui/material'
import PostItem from '../components/post/PostItem'
import { fetchPostsThunk } from '../features/postSlice'

const Home = ({ isAuthenticated }) => {
   const [page, setPage] = useState(1) // 현재 페이지
   const dispatch = useDispatch()
   const { posts, pagination, loading, error } = useSelector((state) => state.posts)

   useEffect(() => {
      dispatch(fetchPostsThunk(page)) // 페이지 번호를 파라미터로 전송
   }, [dispatch, page])

   // 페이지 변경 핸들러
   const handlePageChange = (event, value) => {
      setPage(value) // 페이지 상태 업데이트
   }

   return (
      <Container maxWidth="xs">
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

         {posts.length > 0 ? (
            <>
               {posts.map((post) => (
                  <PostItem key={post.id} post={post} isAuthenticated={isAuthenticated} />
               ))}
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총 페이지 수
                     page={page} // 현재 페이지 상태
                     onChange={handlePageChange} // 페이지 변경 핸들러
                  />
               </Stack>
            </>
         ) : (
            !loading && (
               <Typography variant="body1" align="center">
                  게시물이 없습니다.
               </Typography>
            )
         )}
      </Container>
   )
}

export default Home
