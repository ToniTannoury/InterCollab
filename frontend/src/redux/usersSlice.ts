import { createSlice } from "@reduxjs/toolkit";
export interface Participant {
  _id: string;
  name: string;
  email: string;
  password: string;
  followings: []; 
  profile_picture: string; 
}
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
      state!.currentUser!.followings = follow
      
    },
    removeFollowing: (state, action) => {
      state.currentUser.followings = state.currentUser.followings.filter(
        (user:Participant) =>  {
          return user !== action.payload
        }
      );
    },
  }
})

export const {setCurrentUser , addFollowing , removeFollowing} = usersSlice.actions
export default usersSlice.reducer