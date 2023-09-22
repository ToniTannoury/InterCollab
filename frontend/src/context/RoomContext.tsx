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
nst dispatching =  useDispatch()



  return <RoomContext.Provider value={{ }}>{children}</RoomContext.Provider>;
};