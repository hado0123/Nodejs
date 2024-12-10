import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPostById, getPosts, createPost, updatePost, deletePost } from '../api/snsApi'

export const fetchPostByIdThunk = createAsyncThunk('posts/fetchPostById', async (id, { rejectWithValue }) => {
   try {
      const response = await getPostById(id) // 백엔드 API URL 확인 필요
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 비동기 Thunk 액션: 게시물 가져오기
export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (page, { rejectWithValue }) => {
   try {
      const response = await getPosts(page) // 백엔드 API URL 확인 필요
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 비동기 Thunk 액션: 게시물 등록
export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data.post // 서버에서 반환된 새 게시물 데이터
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

// 비동기 Thunk 액션: 게시물 수정
export const updatePostThunk = createAsyncThunk('posts/updatePost', async (data, { rejectWithValue }) => {
   try {
      const { id, postData } = data
      const response = await updatePost(id, postData)
      return response.data.post // 서버에서 반환된 수정된 게시물 데이터
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 수정 실패')
   }
})

// 비동기 Thunk 액션: 게시물 삭제
export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
   try {
      const response = await deletePost(id)
      return id // 삭제 성공 후 삭제된 게시물의 ID 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// Redux Slice
const postSlice = createSlice({
   name: 'posts',
   initialState: { posts: [], pagination: null, post: null, loading: false, error: null },
   reducers: {}, // 추가적인 리듀서 없음
   extraReducers: (builder) => {
      // fetchPosts 관련 리듀서
      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // fetchPostById 관련 리듀서
      builder
         .addCase(fetchPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
         })
         .addCase(fetchPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // createPost 관련 리듀서
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            // state.posts = [action.payload, ...state.posts] // 새 게시물을 posts 목록에 추가
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // updatePost 관련 리듀서
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

      // deletePost 관련 리듀서
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
