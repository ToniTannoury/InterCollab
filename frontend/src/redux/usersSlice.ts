import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name:"users",
  initialState:{
    currentUser:null,
    followings:[''],

  },
  reducers:{
    setCurrentUser:(state , action)=>{
      state.currentUser = action.payload
    },
    addFollowing: (state, action) => {
      state.followings.push(action.payload);
    },
    removeFollowing: (state, action) => {
      // Remove a user from the followings array
      state.followings = state.followings.filter(
        (user) => user !== action.payload
      );
    },
  }
})

export const {setCurrentUser , addFollowing , removeFollowing} = usersSlice.actions
export default usersSlice.reducer