import Image from 'next/image'
import '../stylesheets/room.css'
import { useRouter } from 'next/navigation';
import { useContext, useReducer } from 'react';
import { peersReducer } from '@/context/peerReducer';
import { RoomContext } from '@/context/RoomContext';


function RoomCard({room}:any) {
  const [state , dispatching ] = useReducer(peersReducer , {})
  const router = useRouter()
  function capitalizeString(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const { setIsRoomInfoModalOpen , isRoomInfoModalOpen,chosenRoom , setChosenRoom } = useContext(RoomContext);

  return (

  )
}

export default RoomCard
