'use client'
import socketIO from "socket.io-client";
import { createContext, ReactNode, useEffect, useState , useReducer, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "peerjs";
import { setLoading } from "@/redux/loadersSlice";
import { setCurrentUser } from "@/redux/usersSlice";
import { message } from "antd";
import { peersReducer } from "./peerReducer";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { addPeerAction, removePeerAction,removeOtherPeersAction  } from "./peerActions";
type RoomProviderProps = {
  children: ReactNode; 
};
const WS = "http://localhost:5000";
export const RoomContext = createContext<null | any>(null);
const ws = socketIO(WS);
export const RoomProvider: React.FunctionComponent<RoomProviderProps> = ({
  children,
}) => {
  const [screenSharringId , setScreenSharringId] = useState<boolean>(false)
  const path = usePathname()
  const {currentUser} = useSelector((state:any)=>state.users)
  const [me , setMe] = useState<Peer>()
  const [stream , setStream] = useState<MediaStream>()
  const [peers , dispatch] = useReducer(peersReducer , {})
  const [participants , setParticipants] = useState<any>([])
  const [isRating, setIsRating] = useState<boolean>(false);
  const [connectionArray, setConnectionArray] = useState<any>([]);
  const [roomId , setRoomId] = useState<any>("")
  const [messages,setMessages] = useState<any>([]) 
  const [mediaShareStatus, setMediaShareStatus] = useState<boolean>(true);
  const memoizedStream = useMemo(() => stream, [stream]);
  const [isRoomInfoModalOpen , setIsRoomInfoModalOpen] = useState<boolean>(false)
  const [chosenRoom , setChosenRoom] = useState<string>('')
 const router = useRouter()
  const dispatching =  useDispatch()
  const switchStream = (stream: MediaStream)=>{
    
    setStream(stream )
    setScreenSharringId(!screenSharringId)
    ws.emit('screensharing', {roomId:roomId , status:!screenSharringId})
    connectionArray?.map((conn:any)=>{
      const videoTrack = stream?.getTracks().find(track=>track.kind === 'video')
      const videoTracks = stream?.getTracks().find(track=>track.kind === 'video')
        conn.peerConnection?.getSenders()[1]?.replaceTrack(videoTrack).catch(
          (err:any)=>console.log(err))
    })
  }
  const removePeer = (peerId: string, stream: MediaStream) => {
    setParticipants((prevParticipants: any[]) =>{
      const removedParticipant = prevParticipants.find(
        (prevParticipant:any) => prevParticipant._id === peerId
      );  
      removedParticipant !== undefined && message.error(`${removedParticipant?.name} left`)
    
      return prevParticipants.filter((participant) => participant._id !== peerId)
    });
  
    dispatch(removePeerAction(peerId, stream));
  };
  
  const getUsers = (participants:{participants:string[]})=>{
    // console.log(participants)
  }
  const enterRoom = ({roomId}:{roomId:string})=>{
    // console.log(roomId)
  }
  const getCurrentUser = async()=>{
    try {
      dispatch(setLoading(true))
      const res = await fetch("http://16.171.116.7:5000/api/users/me" , {
        headers:{
          "Authorization" : `Bearer ${Cookies.get('token')}`
        }
      })
      const data = await res.json()
      
      dispatch(setCurrentUser(data))
      return data
    } catch (error:any) {
      message.error(error.message.data?.message || "Something went left")
    }finally{
      dispatch(setLoading(false))
    }
  }
  const closeRoom = async({roomid , peerId}:{roomid:string , peerId:string})=>{
    const user  = await getCurrentUser()
    console.log(user)
    dispatch(removeOtherPeersAction())
    setParticipants([])
    setMessages([])
    console.log(peerId)
    Cookies.set('creator_id' , peerId)
    setIsRating(true)
    ws.emit('leave-room',{roomId:roomid, peerId:user._id})
    router.push('/')
  }
  const shareScreen = ()=>{
    if(screenSharringId ){
      navigator.mediaDevices.getUserMedia({video:true , audio:true}).then(switchStream)
    }else{
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(switchStream)
    }
  }
  const removeAllPeers = async()=>{
    
  }





  return <RoomContext.Provider value={{ }}>{children}</RoomContext.Provider>;
};