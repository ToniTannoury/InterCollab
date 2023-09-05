import Carousel from "@/components/Carousel";
import {cookies} from 'next/headers'
import SearchUserInput from "@/components/SearchUserInput";
import BottomHomeComponent from "@/components/BottomHomeComponent";
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
      <div className="flex flex-col my-3">
        <h1 className="month-header text-2xl font-extrabold text-center text-ICblue ">
          Rooms Of The Month
        </h1>
        <h4 className="font-base text-gray-400 text-center">Check out the most attended or viewed rooms</h4>
      </div>
      <div>
        <Carousel />
      </div>
        <div className="flex gap-10">
          <BottomHomeComponent/>
        </div>
        
      
    </div>
  )
}
