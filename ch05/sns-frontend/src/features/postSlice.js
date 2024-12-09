// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

// // 비동기 Thunk 액션: 게시물 가져오기
// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
//    try {
//       const response = await axios.get('/api/posts') // 실제 API URL로 변경해야 함
//       return response.data
//    } catch (error) {
//       return rejectWithValue(error.response?.data?.message || '에러 발생')
//    }
// })

// const postSlice = createSlice({
//    name: 'posts',
//    initialState: { posts: [], loading: false, error: null },
//    reducers: {
//       createPost: (state, action) => {
//          state.posts.unshift(action.payload)
//       },
//    },
//    extraReducers: (builder) => {
//       builder
//          .addCase(fetchPosts.pending, (state) => {
//             state.loading = true
//             state.error = null
//          })
//          .addCase(fetchPosts.fulfilled, (state, action) => {
//             state.loading = false
//             state.posts = action.payload
//          })
//          .addCase(fetchPosts.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.payload
//          })
//    },
// })

// export const { createPost } = postSlice.actions
// export default postSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPosts, createPost, updatePost, deletePost } from '../api/snsApi'

// 🔥 비동기 Thunk 액션: 게시물 가져오기
export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
   try {
      const response = await getPosts() // 백엔드 API URL 확인 필요
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 🔥 비동기 Thunk 액션: 게시물 등록
export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data.post // 서버에서 반환된 새 게시물 데이터
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

// 🔥 비동기 Thunk 액션: 게시물 수정
export const updatePostThunk = createAsyncThunk('posts/updatePost', async (postData, { rejectWithValue }) => {
   try {
      const response = await updatePost(postData)
      return response.data.post // 서버에서 반환된 수정된 게시물 데이터
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 수정 실패')
   }
})

// 🔥 비동기 Thunk 액션: 게시물 삭제
export const deletePostThunk = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
   try {
      const response = await deletePost(postId)
      return postId // 삭제 성공 후 삭제된 게시물의 ID 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// 🔥 Redux Slice
const postSlice = createSlice({
   name: 'posts',
   initialState: { posts: [], loading: false, error: null },
   reducers: {}, // 추가적인 리듀서 없음
   extraReducers: (builder) => {
      // 🔥 fetchPosts 관련 리듀서
      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 🔥 createPost 관련 리듀서
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts.unshift(action.payload) // 새 게시물을 posts 목록에 추가
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 🔥 updatePost 관련 리듀서
      builder
         .addCase(updatePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updatePostThunk.fulfilled, (state, action) => {
            state.loading = false
            const index = state.posts.findIndex((post) => post.id === action.payload.id)
            if (index !== -1) {
               state.posts[index] = action.payload // 게시물 교체
            }
         })
         .addCase(updatePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 🔥 deletePost 관련 리듀서
      builder
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = state.posts.filter((post) => post.id !== action.payload) // 삭제된 게시물 제거
         })
         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
