'use client'
import Modal from 'react-modal'
import { setLoading } from "@/redux/loadersSlice"
import { Button, Col, Divider, Row, message } from "antd"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie"
import { setCurrentUser } from "@/redux/usersSlice"
import { RoomContext } from "@/context/RoomContext"
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
