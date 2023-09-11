export const ENTER_ROOM = "ENTER_ROOM" as const

export const enteRoom = (roomId:string)=>({
  type:"ENTER_ROOM",
  payload:roomId
})
