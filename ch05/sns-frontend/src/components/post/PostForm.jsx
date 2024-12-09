import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'

const PostForm = ({ onSubmit, initialValues = {} }) => {
   const [content, setContent] = useState(initialValues.content || '')
   const [imgUrl, setImgUrl] = useState(initialValues.img || '')
   const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
   const [hashtags, setHashtags] = useState(initialValues.hashtags ? initialValues.hashtags.join(', ') : '')

   // initialValues가 변경될 때 상태를 업데이트
   useEffect(() => {
      setContent(initialValues.content || '')
      setImgUrl(initialValues.img || '')
      setHashtags(initialValues.hashtags ? initialValues.hashtags.join(', ') : '')
   }, [initialValues])

   // 이미지 파일 선택 핸들러
   const handleImageChange = (e) => {
      const file = e.target.files[0] // 사용자가 선택한 파일
      if (file) {
         setImgFile(file) // 선택한 파일을 imgFile로 저장
         const reader = new FileReader()
         reader.onload = () => setImgUrl(reader.result) // 미리보기 URL 설정
         reader.readAsDataURL(file)
      }
   }

   // 폼 제출 핸들러
   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('content', content)
      formData.append(
         'hashtags',
         hashtags.split(',').map((tag) => tag.trim())
      ) // 해시태그 배열로 변환
      if (imgFile) formData.append('img', imgFile) // 파일이 존재하면 폼데이터에 추가
      onSubmit(formData)
   }

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
         </Button>

         {imgUrl && (
            <Box mt={2}>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '100%', maxHeight: '300px' }} />
            </Box>
         )}

         {/* 게시물 내용 입력 필드 */}
         <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} />

         {/* 해시태그 입력 필드 */}
         <TextField label="해시태그 (쉼표로 구분)" variant="outlined" fullWidth value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="예: 여행, 음식, 일상" sx={{ mt: 2 }} />

         {/* 등록 / 수정 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {initialValues.id ? '수정하기' : '등록하기'}
         </Button>
      </Box>
   )
}

export default PostForm
