'use client'
import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <h1>
        IC
      </h1>
      <Button  onClick={()=>alert("yo")} className="bg-ICblue" type="primary">Primary Button</Button>
    </div>
  )
}
