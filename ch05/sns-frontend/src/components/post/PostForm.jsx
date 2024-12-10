import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'

const PostForm = ({ onSubmit, initialValues = {} }) => {
   const [content, setContent] = useState(initialValues.content || '')
   const [imgUrl, setImgUrl] = useState(initialValues.img || '')
   const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
   const [hashtags, setHashtags] = useState(initialValues.hashtags ? initialValues.hashtags.join(', ') : '')
   const [isInitialSet, setIsInitialSet] = useState(false) // 초기값 설정 여부

   // 최초에만 initialValues로 상태 초기화 (초기 1회만 실행)
   useEffect(() => {
      if (!isInitialSet) {
         setContent(initialValues.content || '')
         setImgUrl(initialValues.img || '')
         setHashtags(
            Array.isArray(initialValues.Hashtags)
               ? initialValues.Hashtags.map((tag) => `#${tag.title}`).join(' ') // 각 객체의 title을 #과 함께 문자열로 변환
               : ''
         )
         setIsInitialSet(true) // 초기값을 한번 설정했다고 표시
      }
   }, [initialValues, isInitialSet])

   // 이미지 파일 선택 핸들러
   const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return // 파일이 없을 경우 함수 종료

      setImgFile(file) // 선택한 파일을 imgFile로 저장
      const reader = new FileReader()
      reader.onload = (event) => {
         setImgUrl(event.target.result) // 미리보기 URL 설정
      }
      reader.readAsDataURL(file)
   }

   // 폼 제출 핸들러
   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('content', content) // 게시물 내용 추가
      formData.append('hashtags', hashtags) // 해시태그 추가
      if (imgFile) formData.append('img', imgFile) // 이미지 파일 추가
      onSubmit(formData) // FormData 객체를 그대로 전송
   }

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </Button>

         {imgUrl && (
            <Box mt={2}>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '100%', maxHeight: '300px' }} />
            </Box>
         )}

         {/* 게시물 내용 입력 필드 */}
         <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} />

         {/* 해시태그 입력 필드 */}
         <TextField
            label="해시태그 (쉼표로 구분)"
            variant="outlined"
            fullWidth
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="예: 여행, 음식, 일상"
            sx={{ mt: 2 }}
         />

         {/* 등록 / 수정 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {initialValues.id ? '수정하기' : '등록하기'}
         </Button>
      </Box>
   )
}

export default PostForm
