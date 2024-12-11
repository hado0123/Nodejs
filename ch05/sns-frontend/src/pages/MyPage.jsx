import { Container } from '@mui/material'
import MyProfile from '../components/page/MyProfile'

const MyPage = () => {
   return (
      <Container maxWidth="md">
         <h1>마이피드</h1>
         <MyProfile />
      </Container>
   )
}

export default MyPage
