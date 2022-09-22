import { createReducer } from "@reduxjs/toolkit";
import * as actionCreator from "../actionCreator";

const initialState = {
  trackerLoading: true,
  trackerError: null,
  loading:false,
  error: null,
  user: null,
};

const authReducer = createReducer(initialState, (builder) => {
      builder
      .addCase(actionCreator.authStateTrackerStart, (state=>{
        state.trackerLoading=true
        state.trackerError=false
      }))
      .addCase(actionCreator.authStateTrackerSuccess,(state,{payload})=>{
        state.user=payload
        state.trackerLoading=false
        state.trackerError=null
      })
      .addCase(actionCreator.authStateTrackerFail,(state,{payload})=>{
        state.trackerError=null
        state.trackerLoading=false
        state.user=null
      })
      .addCase(actionCreator.authStateTrackerError,(state,{payload})=>{
        state.trackerError=payload
        state.trackerLoading=false
        state.user=null
      })
      .addCase(actionCreator.singUpStart,authReqStartHelper)
      .addCase(actionCreator.singUpSuccess,authReqSuccessHelper)
      .addCase(actionCreator.singUpFail,authReqFailHelper)
      .addCase(actionCreator.signInStart,authReqStartHelper)
      .addCase(actionCreator.signInSuccess,authReqSuccessHelper)
      .addCase(actionCreator.signInFail,authReqFailHelper)
      .addCase(actionCreator.signOutStart,(state,action)=>{
        state.loading=true
      })
      .addCase(actionCreator.signOutSuccess,authReqSuccessHelper)
      .addCase(actionCreator.signOutFail,(state,{payload})=>{
        state.loading=false
        state.error=payload
      })
});



function authReqStartHelper(state,action) {
    state.loading = true;
    state.error = null;
    state.user = null;
}


function authReqSuccessHelper(state,action) {
  state.loading=false
  state.error=null
}

function authReqFailHelper(state,action) {
  state.loading = false;
  state.user = null;
  state.error = action.payload;
}
export default authReducer;
