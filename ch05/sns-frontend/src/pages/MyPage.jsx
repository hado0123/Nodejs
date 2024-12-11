import { Container } from '@mui/material'
import MyProfile from '../components/page/MyProfile'

const MyPage = ({ auth }) => {
   return (
      <Container maxWidth="md">
         <h1>MyFeed</h1>
         <MyProfile auth={auth} />
      </Container>
   )
}

export default MyPage
