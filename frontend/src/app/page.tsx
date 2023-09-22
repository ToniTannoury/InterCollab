import Carousel from "@/components/Carousel";
import {cookies} from 'next/headers'
import SearchUserInput from "@/components/SearchUserInput";
import BottomHomeComponent from "@/components/BottomHomeComponent";
import RoomCard from "@/components/RoomCard";
export async function getUser(){
  try {
    const token = cookies().get('token')

    const res = await fetch("http://16.171.116.7:5000/api/users/me" , {
        headers:{
          "Authorization" : `Bearer ${token!.value}`
        }
      })
      const data = await res.json()


      return data
  } catch (error:any) {
    console.log(error)
  }
}
const getTop5RoomsByTotalParticipants = async()=>{
  const token = cookies().get('token')
  const res = await fetch("http://16.171.116.7:5000/api/rooms/getTop5RoomsByTotalParticipants" , {
    headers:{
      "Authorization" : `Bearer ${token!.value}`
    }
  })
  const data = await res.json()
  return data
}


export default async function Home() {
  const user =await getUser()
  const rooms:any = await getTop5RoomsByTotalParticipants()
  
  return (
    <div>
      <div className="flex flex-col my-3">
        <h1 className="month-header text-3xl font-extrabold text-center text-ICblue ">
          Rooms Of The Month
        </h1>
        <h4 className="font-base text-gray-600 text-center mb-3">Check out the most attended or viewed rooms</h4>
      </div>
      <div>
        <Carousel rooms={rooms?.topRooms} home/>
      </div>
        <div className="flex gap-10">
          <BottomHomeComponent/>
        </div>
        
      
    </div>
  )
}
