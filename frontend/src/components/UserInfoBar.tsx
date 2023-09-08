import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, addFollowing, removeFollowing } from '@/redux/usersSlice';
import Cookies from 'js-cookie';
import "../stylesheets/infoBar.css";

const UserInfoBar = ({ user, search }: any) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(user?.followers?.length || 0);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [picture  ,setPicture] = useState<File|string>('')
  const fileInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsFollowing(currentUser?.followings?.some((followingUser: any) => followingUser === user?._id));
  }, [user?.followings, currentUser?.followings, user?._id]);

  const handleFollowClick = async () => {
    try {
      const url = isFollowing
        ? `http://localhost:5000/api/users/unfollow/${user._id}`
        : `http://localhost:5000/api/users/follow/${user._id}`;

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
          dispatch(addFollowing(user._id));
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
      console.log(11)
      fileInputRef.current?.click();
    }
  };
  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(picture);
    const body = new FormData();
    body.append("filename", picture);
  
    try {
      const response = await fetch('http://localhost:5000/api/users/changeProfilePicture', {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${Cookies.get('token')}`
        },
        body: body
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setCurrentUser(data.data))
        // Update the image source with the new profile picture URL
        const updatedImageUrl = `http://localhost:5000/images/${data.data.profile_picture}`;
        document.querySelector('.user-image')?.setAttribute('src', updatedImageUrl);
  
        setIsEditingProfilePicture(false);
       
      } else {
        // Handle the error case
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
      buttonRef.current?.click(); 
    }
  }, [picture]);
  useEffect(() => {
    if (picture) {
      console.log(currentUser); 
    }
  }, [currentUser]);

  return (
    currentUser && user && (
      <div userid={userId} className='info-bar-container'>
        <div>
          <img
            className='user-image'
            style={search ? { width: "60px", height: "60px" } : { width: "75px", height: "75px" }}
            src={`http://localhost:5000/images/${user.profile_picture}`}
            alt=""
            
          />
       
            <div>
              <form onSubmit={()=>{handleProfilePictureChange}} encType="multipart/form-data">
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
            <span>0</span>
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
