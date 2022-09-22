import { createReducer } from "@reduxjs/toolkit";
import { reqFailUtil, reqStartUtil } from "utils/util";
import * as actionCreator from "../actionCreator";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionCreator.findCatagoriesStart, (state => {
      state.loading = true
      state.data = []
      state.error = null
    }))
    .addCase(actionCreator.findCatagoriesSuccess, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.data = payload
    }).addCase(actionCreator.findCatagoriesFail, (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.data = null
    }).addCase(actionCreator.createCategoryStart, reqStartUtil)
    .addCase(actionCreator.createCategorySuccess, (state) => {
      state.error = null
    }).addCase(actionCreator.createCategoryFail,reqFailUtil)
    .addCase(actionCreator.deleteCategoryStart,reqStartUtil)
    .addCase(actionCreator.deleteCategoryFail,reqFailUtil)
});




export default categoryReducer;
