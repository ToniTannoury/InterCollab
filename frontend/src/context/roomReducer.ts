import {ENTER_ROOM} from "./roomActions"

export type roomState = {roomId:string}


export const roomsReducer = (state:roomState,action:any)=>{
  switch(action.type){
    case ENTER_ROOM:
      return {
        ...state , 
        roomId:action.payload
      }
  
    default:
      return {...state}
  }
}