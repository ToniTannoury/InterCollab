import { createSlice } from "@reduxjs/toolkit";

const searchingSlice = createSlice({
  name:"searching",
  initialState:{
    searching:false,
  },
  reducers:{
    setSearching:(state , action)=>{
      state.searching = action.payload
    },
   
  }
})

export const {setSearching} = searchingSlice.actions
export default searchingSlice.reducer