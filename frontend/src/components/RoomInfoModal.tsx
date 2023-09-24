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
  const router = useRouter()
  const dispatch = useDispatch()
  const [roomData , setRoomData] = useState<any>(null)
  const [code , setCode] = useState<string>('')
  const {currentUser } = useSelector((state:any)=>state.users)

  const {ws , me , stream ,peers,shareScreen , participants ,setRoomId,screenSharringId , messages, mediaShareStatus, setMediaShareStatus , leaveRoom , setMessages ,removeAllPeers,setIsRoomInfoModalOpen , isRoomInfoModalOpen,chosenRoom , setChosenRoom  } = useContext(RoomContext)
  
  const closeRoomInfoModal = ()=>{
    setRoomData('')
    setIsRoomInfoModalOpen(false)
  }
  const fetchJob = async()=>{
    if(!chosenRoom)return
    chosenRoom !== ""
    try {
      const response = await fetch(`http://16.171.116.7:5000/api/rooms/searchRoomById?roomId=${chosenRoom}`,{
        headers:{
          "Authorization":`Bearer ${Cookies.get('token')}`
        }
      })
      const data = await response.json()
     
      setRoomData(data)
    } catch (error:any) {
      message.error(error.message)
    }
  }


  const coinTransfer = async ()=>{
    if(currentUser.coins<roomData?.priceToEnter){
      message.error("Not enough coins to  join")
      return
    }
    router.push(`/test/${roomData?._id}`)
    dispatch(setCurrentUser({
      ...currentUser,
      coins:currentUser.coins-roomData?.priceToEnter
    }))
      const response = await fetch(`http://16.171.116.7:5000/api/users/coinTransfer`,{
      method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${Cookies.get('token')}`
        },
        body:JSON.stringify({
          roomId:chosenRoom,
          amount:roomData?.priceToEnter
        })
      })
      const data = await response.json() 
  }
  useEffect(()=>{
    fetchJob()
  },[chosenRoom])
  const checkPin = async(e:any)=>{
    e.preventDefault()
    roomData?.pinCode === code && router.push(`/test/${roomData?._id}`)
  }
  const joinNow = async ()=>{  
    closeRoomInfoModal()
    
    router.push(`/test/${roomData?._id}`)
  }
  return (
    chosenRoom !== "" && <Modal
    isOpen={isRoomInfoModalOpen}
    onRequestClose={closeRoomInfoModal}
    contentLabel="RoomInfo"
    ariaHideApp={false}
    className={'modalInfo pt-2'}
  >
    {console.log(roomData)}
    <div>
      <h1 className="text-2xl -mt-1 mb-3">{roomData?.title}</h1>
      <Row gutter={[16,16]}>
        <Col span={12} className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>
              Creator's name
            </span>
            <span>
              {roomData?.user?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Creator's rating
            </span>
            <span>
              {roomData?.user?.rating.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Creator's email
            </span>
            <span>
              {roomData?.user?.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Room Category
            </span>
            <span>
              {roomData?.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Max number of participants
            </span>
            <span>
              {roomData?.maxNumberOfParticipants}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Room Type
            </span>
            <span>
              {roomData?.type}
            </span>
          </div>
        </Col>
        <Col span={24} className="flex flex-col gap-2">
          <h1 className="text-xl">
            About the creator
          </h1>
          <Divider className="p-0 h-0 m-0"/>
          <span>{roomData?.user?.about}</span>
          <h1 className="text-xl">
            Room Description
          </h1>
          <Divider className="p-0 h-0 m-0"/>
          <span>{roomData?.description}</span>
         
          <div className="flex justify-end gap-3">
          
          {(roomData?.type === "public" || roomData?.user?._id === currentUser?._id)&&roomData?.type !== "paid" && <Button type="primary" className="bg-ICblue"  onClick={joinNow}>Join Now</Button>}

          {roomData?.type === "private" && roomData?.user?._id !== currentUser?._id &&
          (
            <form onSubmit={checkPin} action="">
              <input value={code} className="pincode" type="text" onChange={(e)=>setCode(e.target.value)}/>
            </form>
          )}
           {(roomData?.type === "paid" )&&roomData?.type !== "public" &&  roomData?.user?._id !== currentUser?._id&&<Button onClick={coinTransfer} type="primary" className="bg-ICblue" >Join Now For {roomData?.priceToEnter} Coins</Button>}
           {(roomData?.type === "paid" )&&roomData?.type !== "public" &&  roomData?.user?._id === currentUser?._id&&<Button type="primary" className="bg-ICblue"  onClick={joinNow}>Join Now</Button>}
        </div>
       
        </Col>
        
      </Row>
    </div>
  </Modal>
  )
}

export default RoomInfoModal
