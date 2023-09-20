"use client"
import React from 'react'
import { useSelector } from 'react-redux'

function AdminHome() {
  const {currentUser} = useSelector((state:any)=>state.users)
  return (
    <div>
      111111111111
    </div>
  )
}

export default AdminHome
