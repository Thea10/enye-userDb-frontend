import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";


export const SearchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: null,
    searchResult: [],
    status: "none",
    error: null,
  },
  reducers: {
    
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    setDefaultStatus: (state, {payload}) => {
      state.status = payload.status;
      state.searchResult = payload.list
    },
    searchUsers: (state, {payload}) =>{
        state.searchResult = _.filter(
            payload.list,
            (user)=> {
              return(
                _.toLower(user.FirstName).includes(_.toLower(payload.text)) || 
                _.toLower(user.LastName).includes(_.toLower(payload.text))
              )
            }
        )
    }
  },

});

export const { setSearchText, setDefaultStatus, searchUsers } = SearchSlice.actions;
export const getSearchText = (state) => state.search.searchText;
export const getStatus = (state) => state.search.status;
export const getSearchedUsers = (state) => state.search.searchResult;

export default SearchSlice.reducer;
