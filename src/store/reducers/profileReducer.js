import { createReducer } from "@reduxjs/toolkit";
import * as actionCreator from "../actionCreator";

const initialState = {
  loading:false,
  error: null,
  data: null,
};

const userReducer = createReducer(initialState, (builder) => {
      builder
      .addCase(actionCreator.findProfileDataStart, (state=>{
        state.loading=true
        state.data=null
        state.error=null
      }))
      .addCase(actionCreator.findProfileDataSuccess,(state,{payload})=>{
        state.loading=false
        state.error=null
        state.data=payload
      }).addCase(actionCreator.findProfileDataFail,(state,{payload})=>{
        state.loading=false
        state.error=payload
        state.data=null
      })
});



export default userReducer;
