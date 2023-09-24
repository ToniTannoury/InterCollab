'use client'
import { useRouter } from "next/navigation"
function BottomHomeComponent() {
  const router = useRouter()
    return (
    <div className="flex w-full gap-10">
     <div className="bottom-home flex ">
      <div className="flex justify-center font-extrabold  items-center bottom-home bg-blue-100 h-200">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-center text-2xl font-semibold text-ICblue">Elevate content creation</p>
          <p className="text-center gray-color">Offer exclusive access to interactive rooms, providing a unique space for audiences </p>
          <button  type="button" className=" bottom-button w-full h-15 bg-ICblue px-10 rounded-lg" onClick={()=>router.push('/createRoom')}>
              <p className="text-xl font-bold text-white">Open Your Room </p>
          </button>
        </div>
      </div>
    </div>
    <div className="bottom-home flex ">
      <div className="flex justify-center font-extrabold  items-center bottom-home bg-blue-100 h-200">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-center text-2xl font-semibold text-ICblue">Join an interactive rooms</p>
          <p className="text-center gray-color">Actively participate in collaborative content creation, connecting with creators and fellow enthusiasts</p>
          <button type="button" className=" bottom-button w-full h-15 bg-ICblue px-10 rounded-lg" onClick={()=>router.push('/rooms')}>
              <p className="text-xl font-bold text-white">Interactive Rooms </p>
          </button>
        </div>
      </div>
    </div>
    </div>
   
  )
}
export default BottomHomeComponent