import React from 'react'
import "../../stylesheets/room.css"
import Image from 'next/image'
import { Button } from 'antd'
function Rooms() {
  return (
    <div >
      <div className='flex flex-col justify-around room-card bg-ICblue'>
        <div className='flex pl-4 justify-between'>
          <h1 className='text-xl text-slate-50'>What are the stars</h1>
          <div className='flex gap-3 mx-3'>
            <span className='p-1 px-2 font-semibold text-slate-50 text-center bg-slate-600 rounded'>
              Anatomy
            </span>
            <span className='p-1 px-2 text-center text-white bg-green-300 rounded'>
              Public
            </span>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-4 gap-2 items-center'>
            <Image className='img mr-1 ' src={(`http://localhost:5000/images/emptyProfile.png`)} alt='logo' width={1000} height={500}>
            </Image>
            <div>
              <h1 className='text-white'>Presenter :</h1>
              <h1 className='text-white'>Toni Tannoury</h1>
            </div>
          </div>
          <div className='mr-3 text-white mt-5'>
            Participants : 300
          </div>
        </div>
        <div>
          <button className='bg-slate-50 h-7 w-20 ml-4 font-semibold text-I'>
            Room Info
          </button>
          </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Rooms
