import {configureStore} from '@reduxjs/toolkit'
import  usersReducer  from './usersSlice'
import  loadersReducer from './loadersSlice'
import searchReducer from './searchingSlice'
export const store = configureStore({
  reducer:{
    users:usersReducer,
    loaders:loadersReducer,
    searching:searchReducer
  }
})