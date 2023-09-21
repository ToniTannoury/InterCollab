import { RoomContext } from '@/context/RoomContext';
import React , {useContext, useState} from 'react'
import Modal from 'react-modal'
function RoomInfoModal() {
  const { setIsRoomInfoModalOpen , isRoomInfoModalOpen } = useContext(RoomContext);
  const closeRoomInfoModal = ()=>{
    setIsRoomInfoModalOpen(false)
  }
  return (
    <Modal
    isOpen={isRoomInfoModalOpen}
    onRequestClose={closeRoomInfoModal}
    contentLabel="RoomInfo"
    ariaHideApp={false}
    className={'modal pt-2'}
  >
    h1
  </Modal>
  )
}

export default RoomInfoModal
