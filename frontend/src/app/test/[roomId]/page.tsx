'use client'
import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
const APP_ID = "89da9174634f426da89fe958eb596946";
const TOKEN = '007eJxTYJjkwpqhwpBZWL7mjxW78izRpxcnSPxkO9yyn8n6n2Z3ZYsCg4VlSqKlobmJmbFJmomRWUqihWVaqqWpRWqSqaWZpYmZjOmvlIZARoZ2tV0sjAwQCOJzMpSkFpfoFuXn5zIwAAAeAR7X';
const CHANNEL = 'test-room';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: "vp8"
});

function InterActiveRooms() {
  const {roomId} = useParams()
  
  const [users, setUsers] = useState<any[]>([]);
useEffect(()=>{
  console.log(1)
  console.log(users)
},[users])
  const handleUserJoined =async (user: any , mediaType:any) => {
    await client.subscribe(user , mediaType)

    mediaType === 'video' && setUsers((prevUsers) => [...prevUsers, user]);

  };

  const handleUserLeft = (user: any) => {

  };

  useEffect(() => {

    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);
    const joinRoom = async()=>{
      
      const response = await fetch(`http://localhost:5000/generateAgoraToken?channelName=${roomId}&uid=${Cookies.get('token')}&role=publisher`);
      console.log(client)
      const data = await response.json();
      console.log(response)
      console.log(data)
      const { token, channelName } = data;
      console.log(token)
      client
      .join(APP_ID, channelName, token,Cookies.get('token') )
      .then((uid) =>
      Promise.all([
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
      ])
        .then((tracks) => {
          const [audioTrack, videoTrack] = tracks;
          setUsers((prevUsers) => [
            ...prevUsers,
            {
              uid,
              audioTrack,
              videoTrack,
            },
          ]);
          return client.publish([audioTrack, videoTrack]);
        })
        .catch((error) => {
          console.error('Error creating and publishing tracks:', error);
        }))
    }
    joinRoom()

   

    return () => {
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, []);

  return (
    <div className='Inter'>
      clg
      {users.map((user) => (
  <div key={user.uid}>
    User {user.uid}
    {console.log(user.videoTrack)}
    {user.videoTrack && (
      <video
        ref={(ref) => {
          if (ref) {
            user.videoTrack.play(ref);
          }
        }}
      />
    )}
  </div>
))}
    </div>
  );
}

export default InterActiveRooms;
