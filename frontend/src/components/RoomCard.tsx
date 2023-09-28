import Image from 'next/image'
import '../stylesheets/room.css'
import { useRouter } from 'next/navigation';
import { useContext, useReducer } from 'react';
import { peersReducer } from '@/context/peerReducer';
import { RoomContext } from '@/context/RoomContext';
type Room = {
  _id: string;
  title: string;
  type: string;
  pinCode: string;
  currentParticipants: []; 
  category:string;
  totalParticipants:[];
  user:{
    name:string;
    profile_picture:string;
  };
}
interface Props{
  room:Room
}

function RoomCard({room}:Props) {
  function capitalizeString(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const { setIsRoomInfoModalOpen , isRoomInfoModalOpen,chosenRoom , setChosenRoom } = useContext(RoomContext);

  return (
    <div data-id={room._id} className='containing'>
      <div className='flex flex-col justify-around room-card bg-ICblue'>
        <div className='flex pl-4 justify-between'>
          <h1 className='text-xl text-slate-50'>{capitalizeString(room.title)}</h1>
          <div className='flex gap-3 mx-3'>
            <span className='p-1 px-2 font-semibold text-slate-50 text-center bg-slate-600 rounded'>
              {capitalizeString(room.category)}
            </span>
            <span className={`p-1 px-2 text-center text-white ${room.type === 'public' && " bg-green-900 rounded"} ${room.type === 'paid' && " bg-yellow-700 rounded"} ${room.type === 'private' && " bg-blue-800 rounded"}` }>
              {capitalizeString(room.type)}
            </span>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-4 gap-2 items-center'>
            <Image className='img mr-1 ' src={(`http://16.171.116.7:5000/images/${room?.user?.profile_picture}`)} alt='logo' width={1000} height={500}>
            </Image>
            <div>
              <h1 className='text-white font-semibold'>Presenter</h1>
              <h1 className='text-white'>{capitalizeString(room.user.name)}</h1>
            </div>
          </div>
          <div className='mr-3 text-white mt-6'>
            Total Number of Participants: {room.totalParticipants.length}
          </div>
        </div>
        <div>
          <button  onClick={()=>{
             setIsRoomInfoModalOpen(true)
             setChosenRoom(room._id)
            }} className='bg-slate-50 h-7 w-20 ml-4 font-semibold text-ICblue card-button'>
            Room Info
          </button>
          </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default RoomCard
