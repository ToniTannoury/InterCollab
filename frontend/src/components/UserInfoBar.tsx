import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, addFollowing, removeFollowing } from '@/redux/usersSlice';
import Cookies from 'js-cookie';
import "../stylesheets/infoBar.css";

const UserInfoBar = ({ user, search }: any) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(user.followers?.length || 0);

  useEffect(() => {
    setIsFollowing(currentUser.followings?.some((followingUser: any) => followingUser === user._id));
  }, [user.followings, currentUser.followings, user._id]);

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

        setFollowerCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);

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

  const userId = user._id;

  return (
    user && (
      <div userid={userId} className='info-bar-container'>
        <div>
          <img className='user-image' src={`http://localhost:5000/images/${user.profile_picture}`} alt="" />
          <div className='username'>{user.name}</div>
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
