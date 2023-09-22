import React, { useState, useEffect, useRef } from 'react';
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


  




};

export default UserInfoBar;
