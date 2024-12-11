import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import postReducer from '../features/postSlice'
import pageReducer from '../features/pageSlice'
import userReducer from '../features/userSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      posts: postReducer,
      page: pageReducer,
      user: userReducer,
   },
})

export default store
