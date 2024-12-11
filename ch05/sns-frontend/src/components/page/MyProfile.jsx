import React, { useEffect, useState, useCallback } from 'react'
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

   // useCallback을 사용하여 fetchProfileData 함수를 메모이제이션
   const fetchProfileData = useCallback(() => {
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
   }, [dispatch, id]) // 의존성 배열에 필요한 값 추가

   useEffect(() => {
      fetchProfileData()
   }, [fetchProfileData, follow]) // follow가 변경될 때만 데이터를 다시 가져옴

   const onClickFollow = useCallback(
      (id) => {
         dispatch(followUserThunk(id)) // Thunk로 데이터 전송
            .unwrap() // Thunk의 결과를 추출
            .then(() => {
               alert('팔로우 되었습니다!')
               setFollow((prev) => !prev) // 팔로우 후 팔로워 수를 다르게 보이게 하기 위해 반전
            })
            .catch((error) => {
               alert(error)
            })
      },
      [dispatch]
   )

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
                     disabled={!id || String(auth.id) === String(id) || user.Followers.filter((f) => f.id === auth.id).length > 0 ? true : false} // 버튼 비활성화 조건 적용
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
