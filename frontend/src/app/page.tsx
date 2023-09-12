import Carousel from "@/components/Carousel";
import {cookies} from 'next/headers'
import SearchUserInput from "@/components/SearchUserInput";
import BottomHomeComponent from "@/components/BottomHomeComponent";
import RoomCard from "@/components/RoomCard";
export async function getUser(){
  try {
    const token = cookies().get('token')

    const res = await fetch("http://localhost:5000/api/users/me" , {
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
const roomsOfTheMonth = 
  [
    {
      category: "Astronomy",
      createdAt: "2023-09-06T20:15:30.835Z",
      currentParticipants: [],
      description: "aaaaaaa",
      isRoomOftheMonth: false,
      maxNumberOfParticipants: 100,
      pinCode: "U4F-y3A",
      priceToEnter: 0,
      title: "astra",
      totalParticipants: [],
      type: "public",
      updatedAt: "2023-09-06T20:15:30.835Z",
      user: {
        about: "Hello i am aya",
        createdAt: "2023-09-04T17:17:08.111Z",
        email: "aya@gmail.com",
        followers: [],
        followings: ["64f613dc0d71de3db5a9b68e"],
        name: "aya",
        password: "$2a$10$sAHR3qs5bn1sA1LPSUq/iOVjievl9vTRfP/kNofCub4yu6GEpssdC",
        phone: "03671674",
        profile_picture: "th.jpg",
        rating: 5,
        updatedAt: "2023-09-06T21:41:04.649Z",
        _id: "64f611140d71de3db5a9b687",
      },
  
      _id: "64f8dde2ee290d2ca0cc6b9c",
    },
    {
      category: "Astronomy",
      createdAt: "2023-09-06T20:15:30.835Z",
      currentParticipants: [],
      description: "aaaaaaa",
      isRoomOftheMonth: false,
      maxNumberOfParticipants: 100,
      pinCode: "U4F-y3A",
      priceToEnter: 0,
      title: "astra",
      totalParticipants: [],
      type: "public",
      updatedAt: "2023-09-06T20:15:30.835Z",
      user: {
        about: "Hello i am aya",
        createdAt: "2023-09-04T17:17:08.111Z",
        email: "aya@gmail.com",
        followers: [],
        followings: ["64f613dc0d71de3db5a9b68e"],
        name: "aya",
        password: "$2a$10$sAHR3qs5bn1sA1LPSUq/iOVjievl9vTRfP/kNofCub4yu6GEpssdC",
        phone: "03671674",
        profile_picture: "th.jpg",
        rating: 5,
        updatedAt: "2023-09-06T21:41:04.649Z",
        _id: "64f611140d71de3db5a9b687",
      },
  
      _id: "64f8dde2ee290d2ca0cc6b9c",
    },
    {
      category: "Astronomy",
      createdAt: "2023-09-06T20:15:30.835Z",
      currentParticipants: [],
      description: "aaaaaaa",
      isRoomOftheMonth: false,
      maxNumberOfParticipants: 100,
      pinCode: "U4F-y3A",
      priceToEnter: 0,
      title: "astra",
      totalParticipants: [],
      type: "public",
      updatedAt: "2023-09-06T20:15:30.835Z",
      user: {
        about: "Hello i am aya",
        createdAt: "2023-09-04T17:17:08.111Z",
        email: "aya@gmail.com",
        followers: [],
        followings: ["64f613dc0d71de3db5a9b68e"],
        name: "aya",
        password: "$2a$10$sAHR3qs5bn1sA1LPSUq/iOVjievl9vTRfP/kNofCub4yu6GEpssdC",
        phone: "03671674",
        profile_picture: "th.jpg",
        rating: 5,
        updatedAt: "2023-09-06T21:41:04.649Z",
        _id: "64f611140d71de3db5a9b687",
      },
  
      _id: "64f8dde2ee290d2ca0cc6b9c",
    },
    {
      category: "Astronomy",
      createdAt: "2023-09-06T20:15:30.835Z",
      currentParticipants: [],
      description: "aaaaaaa",
      isRoomOftheMonth: false,
      maxNumberOfParticipants: 100,
      pinCode: "U4F-y3A",
      priceToEnter: 0,
      title: "astra",
      totalParticipants: [],
      type: "public",
      updatedAt: "2023-09-06T20:15:30.835Z",
      user: {
        about: "Hello i am aya",
        createdAt: "2023-09-04T17:17:08.111Z",
        email: "aya@gmail.com",
        followers: [],
        followings: ["64f613dc0d71de3db5a9b68e"],
        name: "aya",
        password: "$2a$10$sAHR3qs5bn1sA1LPSUq/iOVjievl9vTRfP/kNofCub4yu6GEpssdC",
        phone: "03671674",
        profile_picture: "th.jpg",
        rating: 5,
        updatedAt: "2023-09-06T21:41:04.649Z",
        _id: "64f611140d71de3db5a9b687",
      },
  
      _id: "64f8dde2ee290d2ca0cc6b9c",
    },
    {
      category: "Astronomy",
      createdAt: "2023-09-06T20:15:30.835Z",
      currentParticipants: [],
      description: "aaaaaaa",
      isRoomOftheMonth: false,
      maxNumberOfParticipants: 100,
      pinCode: "U4F-y3A",
      priceToEnter: 0,
      title: "astra",
      totalParticipants: [],
      type: "public",
      updatedAt: "2023-09-06T20:15:30.835Z",
      user: {
        about: "Hello i am aya",
        createdAt: "2023-09-04T17:17:08.111Z",
        email: "aya@gmail.com",
        followers: [],
        followings: ["64f613dc0d71de3db5a9b68e"],
        name: "aya",
        password: "$2a$10$sAHR3qs5bn1sA1LPSUq/iOVjievl9vTRfP/kNofCub4yu6GEpssdC",
        phone: "03671674",
        profile_picture: "th.jpg",
        rating: 5,
        updatedAt: "2023-09-06T21:41:04.649Z",
        _id: "64f611140d71de3db5a9b687",
      },
  
      _id: "64f8dde2ee290d2ca0cc6b9c",
    },
  ];
  

export default async function Home() {
  const user =await getUser()
 
  return (
    <div>
        <h1 className="month-header text-4xl font-extrabold  text-ICblue ">
          Home
        </h1>
      <div className="flex flex-col my-3">
        <h1 className="month-header text-2xl font-extrabold text-center text-ICblue ">
          Rooms Of The Month
        </h1>
        <h4 className="font-base text-gray-600 text-center">Check out the most attended or viewed rooms</h4>
      </div>
      <div>
        <Carousel rooms={roomsOfTheMonth} home/>
      </div>
        <div className="flex gap-10">
          <BottomHomeComponent/>
        </div>
        
      
    </div>
  )
}
