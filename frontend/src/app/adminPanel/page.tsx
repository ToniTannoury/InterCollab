import ReduxProvider from '@/components/ReduxProvider'
import React from 'react'
import AdminHome from '../adminHome/page'

function page() {
  
  return (
    <ReduxProvider>
      <AdminHome/>
    </ReduxProvider>
   
  )
}

export default page
