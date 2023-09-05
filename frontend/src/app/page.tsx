import Carousel from "@/components/Carousel";
import {cookies} from 'next/headers'
import SearchUserInput from "@/components/SearchUserInput";
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
      <div>
        <SearchUserInput/>
      </div>
      <div>
        <Carousel/>
      </div>
    </div>
  )
}
