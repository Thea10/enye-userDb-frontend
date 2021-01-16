import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";


export const fetchUsers = createAsyncThunk("features/getUsers", async () => {
  let url = " https://api.enye.tech/v1/challenge/records";
  const response = await axios.get(`${url}`);
  if (response.data.Error) {
    return response.data.Error;
  }
  return response.data.records.profiles;
});


export const FeatureSlice = createSlice({
  name: "features",
  initialState: {
    userList: [],
    filteredList: [],
    status: "none",
    filtered: false,
    filterBy: "none",
    filterValue: null,
    error: null,
  },
  reducers: {
    storeUsers: (state, { payload }) => {
      state.userList.push(payload);
    },
    setFilterBy: (state, {payload})=>{
      state.filterBy = payload;
    },
    clearFilters: (state)=>{
      state.filtered = false;
      state.filterBy = "none";
      state.filterValue = null
    },
    filterByGender: (state, {payload}) =>{
      state.filteredList = _.filter(
       state.userList,
        (user)=> _.toLower(user.Gender) === _.toLower(payload) 
    );
    state.filterValue = payload;
    state.filtered = true
    },
    filterByPaymentMethod: (state, {payload}) =>{
      state.filteredList = _.filter(
       state.userList,
        (user)=> _.toLower(user.PaymentMethod) === _.toLower(payload) 
    );
    state.filterValue = payload;
    state.filtered = true

    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.status = "succeeded";
        state.userList = payload;
      } else {
        state.status = "failed";
        state.error = payload;
      }
    },
    [fetchUsers.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    },
  },
});

export const { setFilterBy,  filterByGender, filterByPaymentMethod,clearFilters } = FeatureSlice.actions;

export const getStatus = (state) => state.feature.status;
export const getUsers = (state) => state.feature.userList;
export const getfilteredList = (state) => state.feature.filteredList;
export default FeatureSlice.reducer;
