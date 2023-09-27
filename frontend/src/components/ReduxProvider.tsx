"use client"
import React, { ReactNode } from 'react'
import { store } from '@/redux/store'
import {Provider} from  "react-redux"
interface Props {
  children:ReactNode
}
function ReduxProvider({children}:Props) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default ReduxProvider
