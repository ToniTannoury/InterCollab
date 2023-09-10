'use client'

import socketIO from "socket.io-client";
import { createContext, ReactNode, useEffect, useState , useReducer} from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "peerjs";
import { setLoading } from "@/redux/loadersSlice";
import { setCurrentUser } from "@/redux/usersSlice";
import { message } from "antd";
import { peersReducer } from "./peerReducer";
import { usePathname } from "next/navigation";

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
  const [connectionArray, setConnectionArray] = useState<any>([]);
  const [roomId , setRoomId] = useState<string>("")
  console.log(peers)
  const dispatching =  useDispatch()
  const switchStream = (stream: MediaStream)=>{
    setStream(stream)
    setScreenSharringId(!screenSharringId)
    console.log(connectionArray)
    connectionArray?.map((conn:any)=>{
      console.log(conn.connection)
      const videoTrack = stream?.getTracks().find(track=>track.kind === 'video')
        conn.peerConnection?.getSenders()[1].replaceTrack(videoTrack).catch(
          (err:any)=>console.log(err))
    })
  }
  const removePeer = (peerId:string , stream: MediaStream)=>{
    dispatch(removePeerAction(peerId , stream))

    console.log(me?.id , peerId)

  }
  const getUsers = (participants:{participants:string[]})=>{
    console.log(participants)
  }
  const enterRoom = ({roomId}:{roomId:string})=>{
    console.log(roomId)
    // navigate(`/room/${roomId}`)
  }
  const shareScreen = ()=>{
    if(screenSharringId){
      navigator.mediaDevices.getUserMedia({video:true , audio:true}).then(switchStream)

    }else{
      navigator.mediaDevices.getDisplayMedia({}).then(switchStream)

    }

  }
  useEffect(()=>{
    console.log(path)
    const getCurrentUser = async()=>{
      try {
        dispatching(setLoading(true))
        console.log(2)
        const res = await fetch("http://localhost:5000/api/users/me" , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        console.log(1)
        const data = await res.json()
        console.log(data)    
        const peer = new Peer(data?._id)
        console.log(peer)
        console.log(22)
        setMe(peer)
      } catch (error:any) {
        message.error(error.message.data?.message || "Something went left")
      }finally{
        dispatching(setLoading(false))
      }
    } 
    getCurrentUser().then(res=>{
      try {
        navigator.mediaDevices.getUserMedia({video:true , audio:true}).then((stream)=>{
          setStream(stream)
        })
      } catch (error) {
        console.log(error)
      }
      ws.on("room-created" , enterRoom)
      ws.on("get-users" , getUsers)
      ws.on("user-disconnected" , removePeer)
      return ()=>{
        ws.off("room-created")
        ws.off("get-users")
        ws.off("user-disconnected")
        ws.off("user-joined")
      }
    })
  },[])
  useEffect(()=>{
    if(!me) return
    if(!stream) return
    me.on("call" , (call)=>{
      console.log(call)
      call.answer(stream)
      call.on("stream" , (peerStream)=>{
             const peerId = call.peer;
             console.log(12)
      dispatch(addPeerAction(peerId, peerStream));
      
      setConnectionArray((prevConnections:any) => ([
        ...prevConnections,
        call,
      ]));
    });
  });
    ws.on("user-joined",({peerId})=>{
      console.log(me , peerId)
      const call = me.call(peerId , stream)
      console.log(call)
      call.on("stream" , (peerStream)=>{
        console.log(12)
        dispatch(addPeerAction(peerId , peerStream))
      })
      setConnectionArray((prevConnections:any) => ([
        ...prevConnections,
        call,
      ]));
    
      call.on("error", function (err) {
        console.error(err);
    });
    })

  },[me , stream])
  console.log(peers)
  console.log(path)
  if(!path.startsWith("/test")){
    // ws.disconnect()
    const s = new MediaStream;
   
  }
  return <RoomContext.Provider value={{ ws , me, stream , peers , shareScreen , setRoomId}}>{children}</RoomContext.Provider>;
};