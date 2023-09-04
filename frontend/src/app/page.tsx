'use client'
import { Button } from "antd";
import { useEffect } from "react";
import Cookie from 'js-cookie'
export default function Home() {
  const [user , setUser] = useState()
  const getME = async()=>{
    const res = await fetch("http://localhost:5000/api/users/me" , {
      headers:{
        "Authorization" : `Bearer ${Cookie.get('token')}`
      }
    })
    const data = await res.json()
    console.log(data)
    return data
  }
  useEffect(()=>{
    const a = getME()
    
  },[])
  return (
    <div>
      <h1>
        IC
      </h1>
      <Button  onClick={()=>alert("yo")} className="bg-ICblue" type="primary">Primary Button</Button>
    </div>
  )
}
