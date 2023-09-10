import React, { useEffect, useRef } from 'react'

export const VideoPlayer:React.FC<{stream:MediaStream}>=({stream}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(()=>{
    console.log(videoRef.current)
    if(videoRef.current) videoRef.current.srcObject = stream
  },[stream])
  return (
    <div>
      room
      <video ref={videoRef} autoPlay muted/>
    </div>
  )
}
