import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography } from '@mui/material'
import PostItem from '../components/post/PostItem'
import { fetchPosts } from '../features/postSlice'

const Home = () => {
   const dispatch = useDispatch()
   const { posts, loading, error } = useSelector((state) => state.posts)

   useEffect(() => {
      dispatch(fetchPosts())
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

// import Menu from '../components/Menu'
// import Footer from '../components/Footer'
// import { Wrap, Main } from '../styles/StyledComponent'

// function Home() {
//    return (
//       <Wrap>
//          <Menu />
//          <Main></Main>
//          <Footer />
//       </Wrap>
//    )
// }

// export default Home
