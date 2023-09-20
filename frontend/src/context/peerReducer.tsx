import {ADD_PEER , REMOVE_PEER , REMOVE_OTHER_PEERS} from "./peerActions"

export type PeerState = Record<string , {stream:MediaStream}>
type peerAction ={
  type:string;
  payload:{peerId:string; stream:MediaStream}
}| {
  type:string;
  payload:{peerId:string; stream:MediaStream}
}

export const peersReducer = (state:PeerState,action:peerAction)=>{
  switch(action.type){
    case ADD_PEER:
      return{
        ...state,
        [action.payload.peerId]:{
          stream:action.payload.stream
        }
      }
    case REMOVE_PEER:
      const{[action.payload.peerId]:deleted , ...rest} = state
      return rest
    case REMOVE_OTHER_PEERS:
      return {}
    default:
      return {...state}
  }
}