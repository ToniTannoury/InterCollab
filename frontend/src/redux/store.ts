import {configureStore} from '@reduxjs/toolkit'
import  usersReducer  from './usersSlice'
import  loadersReducer from './loadersSlice'

export const store = configureStore({
  reducer:{
    users:usersReducer,
    loaders:loadersReducer
  }
})