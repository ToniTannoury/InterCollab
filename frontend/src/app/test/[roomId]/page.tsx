'use client'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { RoomContext } from '@/context/RoomContext';
import { VideoPlayer } from '@/components/VideoPlayer';
import { PeerState, peersReducer } from '../../../context/peerReducer'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { ShareScreenButton } from '@/components/ShareScreenButton';
import { setLoading } from '@/redux/loadersSlice';
import { setCurrentUser } from '@/redux/usersSlice';
import { message } from 'antd';
import Image from 'next/image';
import LeaveRoomButton from '@/components/LeaveRoomButton';
import { CloseRoomButton } from '@/components/CloseRoomButton';
import { removeOtherPeersAction } from '@/context/peerActions';

interface Participant {
  _id: string;
  name: string;
  email: string;
  password: string;
  followings: any[]; 
}
function Room() {



     

    
      return result;
    }


  return (

         
          
          
          

</div>
  )
}
export default Room