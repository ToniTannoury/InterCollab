import React, { useEffect, useRef } from 'react'

export const VideoPlayer:React.FC<{stream:MediaStream , screenSharringId:boolean}>=({stream , screenSharringId}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(()=>{
    if(videoRef.current) videoRef.current.srcObject = stream
  },[stream])
  return (
    <div className=''>
<video className="w-screen" style={screenSharringId ? { width:"800px", height:"590px"} : { width:"790px" }} ref={videoRef} autoPlay muted />
    </div>
  )
}
