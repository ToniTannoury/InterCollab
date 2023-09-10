export const ADD_PEER = "ADD_PEER" as const
export const REMOVE_PEER = "REMOVE_PEER" as const
export const REMOVE_OTHER_PEERS = "REMOVE_OTHER_PEERS" as const
export const addPeerAction = (peerId:string , stream:MediaStream)=>({
  type:"ADD_PEER",
  payload:{peerId , stream}
})

export const removePeerAction = (peerId:string , stream:MediaStream)=>({
  type:"REMOVE_PEER",
  payload:{peerId , stream}
})

export const removeOtherPeersAction = (peerId:string , stream:MediaStream)=>({
  type:"REMOVE_OTHER_PEERS",
  payload:{peerId , stream}
})