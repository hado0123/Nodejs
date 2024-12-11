import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getProfileIdThunk } from '../../features/pageSlice'
import { followUserThunk } from '../../features/userSlice'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const MyProfile = ({ auth }) => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.page)
   const [followers, setFollowers] = useState(0)
   const [followings, setFollowings] = useState(0)
   const [follow, setFollow] = useState(false)

   useEffect(() => {
      if (id) {
         dispatch(getProfileIdThunk(id)) // 다른 사람 프로필 정보
            .unwrap() // Thunk의 결과를 추출
            .then((response) => {
               setFollowers(response.Followers.length)
               setFollowings(response.Followings.length)
            })
            .catch((error) => {
               alert(error)
            })
      } else {
         dispatch(getProfileThunk()) // 내 정보
            .unwrap() // Thunk의 결과를 추출
            .then((response) => {
               setFollowers(response.Followers.length)
               setFollowings(response.Followings.length)
            })
            .catch((error) => {
               alert(error)
            })
      }
   }, [dispatch, id, follow])

   const onClickFollow = (id) => {
      dispatch(followUserThunk(id)) // Thunk로 데이터 전송
         .unwrap() // Thunk의 결과를 추출
         .then((response) => {
            alert('팔로우 되었습니다!')
            setFollow(true) // 팔로우 후 팔로워 수를 다르게 보이게 하기 위해
         })
         .catch((error) => {
            alert(error)
         })
   }

   return (
      <>
         {user && (
            <Card sx={{ minWidth: 275 }}>
               <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                     {user.email}
                  </Typography>
                  <Typography variant="h5" component="div">
                     {user.nick}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>자기소개</Typography>
                  <Typography variant="body2">
                     {followers} Followers &nbsp;&nbsp;&nbsp; {followings} Followings
                  </Typography>
               </CardContent>
               <CardActions sx={{ p: 2 }}>
                  <Button
                     variant="contained"
                     onClick={() => onClickFollow(`${user.id}`)}
                     // path에 id가 없거나(내 페이지), 내 페이지가 아니거나, 이미 팔로우한 사람 이라면
                     disabled={!id || String(auth.id) === String(id) || user.Followers.filter((f) => f.id === auth.id).length > 0 ? true : false} // id가 없으면 disabled = true
                  >
                     Follow
                  </Button>
               </CardActions>
            </Card>
         )}
      </>
   )
}

export default MyProfile
