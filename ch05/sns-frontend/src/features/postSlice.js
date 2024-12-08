import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 비동기 Thunk 액션: 게시물 가져오기
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
   try {
      const response = await axios.get('/api/posts') // 실제 API URL로 변경해야 함
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '에러 발생')
   }
})

const postSlice = createSlice({
   name: 'posts',
   initialState: { posts: [], loading: false, error: null },
   reducers: {
      createPost: (state, action) => {
         state.posts.unshift(action.payload)
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPosts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
         })
         .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { createPost } = postSlice.actions
export default postSlice.reducer
