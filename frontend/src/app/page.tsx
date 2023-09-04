// 'use client'
import { Button , message } from "antd";
// import { useEffect } from "react";
import Cookie from 'js-cookie'
// import { useState } from "react";
import {cookies} from 'next/headers'
export async function getUser(){
  try {
    const token = cookies().get('token')
    console.log(token)
    const res = await fetch("http://localhost:5000/api/users/me" , {
        headers:{
          "Authorization" : `Bearer ${token!.value}`
        }
      })
      const data = await res.json()
      console.log(data)

      return data
  } catch (error:any) {
    console.log(error)
  }
}
export default async function Home() {
  const user =await getUser()
 
  return (
    <div>
      {user && user.name}
    </div>
  )
}
