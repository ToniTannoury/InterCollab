import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, addFollowing, removeFollowing } from '@/redux/usersSlice';
import Cookies from 'js-cookie';
import "../stylesheets/infoBar.css";
export interface Participant {
  _id: string;
  name: string;
  email: string;
  password: string;
  followings: []; 
  profile_picture: string; 
  followers: [];
  rating:number
}
export type Room = {
  _id: string;
  title: string;
  type: string;
  pinCode: string;
  currentParticipants: []; 
   
  user:Participant
}
interface Props {
  user:Participant;
  search:boolean
}
const UserInfoBar = ({ user, search }: Props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(user?.followers?.length || 0);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [picture  ,setPicture] = useState<File|string>('')
  const fileInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsFollowing(currentUser?.followings?.some((followingUser: string) => followingUser === user?._id));
  }, [user?.followings, currentUser?.followings, user?._id]);

  const handleFollowClick = async () => {
    try {
      const url = isFollowing
        ? `http://16.171.116.7:5000/api/users/unfollow/${user._id}`
        : `http://16.171.116.7:5000/api/users/follow/${user._id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${Cookies.get('token')}`
        }
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);

        setFollowerCount((prevCount:number )=> isFollowing ? prevCount - 1 : prevCount + 1);

        if (isFollowing) {
          dispatch(removeFollowing(user._id));
        } else {
          dispatch(addFollowing(user));
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const userId = user?._id;

  const handleProfilePictureClick = () => {
    if (!isEditingProfilePicture) {
      fileInputRef.current?.click();
    }
  };
  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    event.preventDefault();
    const body = new FormData();
    body.append("filename", picture);
    body.forEach((value, key) => {
      console.log(key, value);
    });
   
    try {
      const response = await fetch('http://16.171.116.7:5000/api/users/changeProfilePicture', {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${Cookies.get('token')}`
        },
        body: body
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentUser(data.data))
   
        const updatedImageUrl = `http://16.171.116.7:5000/images/${data.data.profile_picture}`;
        document.querySelector('.user-image')?.setAttribute('src', updatedImageUrl);
  
        setIsEditingProfilePicture(false);
       
      } else {
      
        console.error('Failed to change profile picture');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile =event.target.files !== null && event.target.files[0];
    selectedFile && setPicture(selectedFile) 
  };
  useEffect(() => {
    if (picture) {
      buttonRef.current?.click()
    }
  }, [picture]);


  return (
    currentUser && user && (
      <div userid={userId} className='info-bar-container'>
        <div>
          <img
            className='user-image'
            style={search ? { width: "60px", height: "60px" } : { width: "75px", height: "75px" }}
            src={`http://16.171.116.7:5000/images/${user.profile_picture}`}
            alt=""
            
          />
       
            <div>
              <form onSubmit={handleProfilePictureChange} encType="multipart/form-data">
                <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileInputChange}
              />
              <button ref={buttonRef} type='submit' style={{ display: 'none' }}  ></button>
              </form>
                
            {search ? <div className='username'>{user.name}</div> :<div className='username' onClick={handleProfilePictureClick}>Edit</div>}
            </div>
          
        </div>
        <div className='info-right'>
          <div className='info-box'>
            <span>{followerCount}</span>
            <span>Followers</span>
          </div>
          <div className='info-box'>
            <span>{user.followings?.length || 0}</span>
            <span>Following</span>
          </div>
          <div className='info-box'>
            <span className='flex items-center justify-center gap-1'>{user.rating} <div  className='ri-star-line text-yellow-400 font-extrabold '></div></span>
            <span>Rating</span>
          </div>
        </div>
        {search && (
          <div>
            <button
              className='add-to-followers'
              onClick={handleFollowClick}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default UserInfoBar;
