import React , {useState} from 'react'
import Modal from 'react-modal'
function RoomInfoModal() {
  const [isRoomInfoModalOpen , setIsRoomInfoModalOpen] = useState<boolean>(true)
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
    
  </Modal>
  )
}

export default RoomInfoModal
