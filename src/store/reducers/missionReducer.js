import { createReducer } from "@reduxjs/toolkit";
import { reqFailUtil, reqStartUtil } from "utils/util";
import * as actionCreator from "../actionCreator";

const initialState = {
  loading: false,
  error: null,
  data: [],
  filteredData: [],
  fetchLoading: false,
  fetchError: null,
  fetchData: null
};

const missionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionCreator.fetchMissionsStart, (state => {
      state.loading = true
      state.data = []
      state.filteredData = []
      state.error = null
    }))
    .addCase(actionCreator.fetchMissionsSuccess, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.data = payload
      state.filteredData = payload
    }).addCase(actionCreator.fetchMissionsFail, (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.data = null
      state.filteredData = null
    }).addCase(actionCreator.addMissionStart, reqStartUtil)
    .addCase(actionCreator.addMissionFail, reqFailUtil)
    .addCase(actionCreator.editMissionStart, reqStartUtil)
    .addCase(actionCreator.editMissionSuccess, (state) => {
      state.loading = false
      state.error=null
    })
    .addCase(actionCreator.editMissionFail, reqFailUtil)
    .addCase(actionCreator.deleteMissionStart, reqStartUtil)
    .addCase(actionCreator.deleteMissionFail, reqFailUtil)
    .addCase(actionCreator.filterMissions, (state, { payload }) => {
      let query = payload
      let queryRegex = new RegExp(query.trim(), 'ig')
      if (!state.data.length) return
      state.filteredData = state.data;
      state.filteredData = state.filteredData.filter(mission => {
        return mission.content.match(queryRegex)
      });
    }).addCase(actionCreator.fetchSpecificMissionStart, (state) => {
      state.fetchLoading = true
      state.fetchError = null
      state.fetchData = null
    }).addCase(actionCreator.fetchSpecificMissionSuccess, (state, { payload }) => {
      state.fetchLoading = false
      state.fetchError = null
      state.fetchData = payload
    }).addCase(actionCreator.fetchSpecificMissionFail, (state, { payload }) => {
      state.fetchError = false
      state.fetchData = null
      state.fetchError = payload
    })
});





export default missionReducer;
