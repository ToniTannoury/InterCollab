import { RoomContext } from '@/context/RoomContext';
import React , {useContext, useState} from 'react'
import Modal from 'react-modal'
function RoomInfoModal() {
  const { setIsRoomInfoModalOpen , isRoomInfoModalOpen,chosenRoom , setChosenRoom } = useContext(RoomContext);

  const closeRoomInfoModal = ()=>{
    setIsRoomInfoModalOpen(false)
  }
  return (
    chosenRoom !== "" && <Modal
    isOpen={isRoomInfoModalOpen}
    onRequestClose={closeRoomInfoModal}
    contentLabel="RoomInfo"
    ariaHideApp={false}
    className={'modal pt-2'}
  >
    {chosenRoom}
  </Modal>
  )
}

export default RoomInfoModal
