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
      const follow = [...state!.currentUser!.followings , action.payload._id]
      console.log(follow)
      state!.currentUser!.followings = follow
      
    },
    removeFollowing: (state, action) => {
      state.currentUser.followings = state.currentUser.followings.filter(
        (user:any) =>  {
          return user !== action.payload
        }
      );
    },
  }
})

export const {setCurrentUser , addFollowing , removeFollowing} = usersSlice.actions
export default usersSlice.reducer