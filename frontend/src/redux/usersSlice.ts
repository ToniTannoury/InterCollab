import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name:"users",
  initialState:{
    currentUser:null,
    followings:[''],

  },
  reducers:{
    setCurrentUser:(state , action)=>{
      console.log(action.payload)
      state.currentUser = action.payload
    },
    addFollowing: (state, action) => {
      console.log("hereeeeeeeeee" , action.payload)
      console.log(state.currentUser)
      const follow = [...state!.currentUser!.followings , action.payload._id]
      console.log(follow)
      state!.currentUser!.followings = follow
      
    },
    removeFollowing: (state, action) => {
      console.log(action)
      state.currentUser.followings = state.currentUser.followings.filter(
        (user:any) =>  {
          console.log(user , action.payload)
          return user !== action.payload
        }
      );
      console.log(state.currentUser.followings)
    },
  }
})

export const {setCurrentUser , addFollowing , removeFollowing} = usersSlice.actions
export default usersSlice.reducer