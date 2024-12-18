import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Button, Box } from '@mui/material'

const PostForm = ({ onSubmit, initialValues = {} }) => {
   const [content, setContent] = useState(initialValues.content || '') // 게시물 내용 상태
   const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '') // 이미지 URL
   const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
   const [hashtags, setHashtags] = useState(
      Array.isArray(initialValues.Hashtags)
         ? initialValues.Hashtags.map((tag) => `#${tag.title}`).join(' ') // 각 객체의 title을 #과 함께 문자열로 변환
         : ''
   )

   // 이미지 파일 선택 핸들러
   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return // 파일이 없을 경우 함수 종료

      setImgFile(file) // 선택한 파일을 imgFile로 저장
      const reader = new FileReader()
      reader.onload = (event) => {
         setImgUrl(event.target.result) // 미리보기 URL 설정
      }
      reader.readAsDataURL(file)
   }, []) // 의존성 배열 비우기 - handleImageChange 함수는 항상 동일하게 유지

   // 폼 제출 핸들러
   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()

         // 콘텐츠와 해시태그가 비어 있는지 확인
         if (!content.trim()) {
            alert('콘텐츠를 입력해주세요.')
            return
         }

         if (!hashtags.trim()) {
            alert('해시태그를 입력해주세요.')
            return
         }

         //이미지 not null로 바꾸기!
         // 이미지 파일이 선택되지 않았는지 확인
         if (!imgFile) {
            alert('이미지 파일을 추가해주세요.')
            return
         }

         const formData = new FormData() // 폼 데이터를 쉽게 생성하고 전송할 수 있도록 하는 객체
         formData.append('content', content) // 게시물 내용 추가
         formData.append('hashtags', hashtags) // 해시태그 추가
         formData.append('img', imgFile) // 이미지 파일 추가

         onSubmit(formData) // FormData 객체를 그대로 전송
      },
      [content, hashtags, imgFile, onSubmit]
   ) // 필요한 의존성만 추가

   // 등록/수정 버튼 라벨 메모이제이션
   const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </Button>

         {imgUrl && (
            <Box mt={2}>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
            </Box>
         )}

         {/* 게시물 내용 입력 필드 */}
         <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} />

         {/* 해시태그 입력 필드 */}
         <TextField label="해시태그 (# 구분)" variant="outlined" fullWidth value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="예: #여행 #음식 #일상" sx={{ mt: 2 }} />

         {/* 등록 / 수정 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {submitButtonLabel}
         </Button>
      </Box>
   )
}

export default PostForm
