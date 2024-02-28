import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    comments: [],
    loading: false,
    error: false,
  };
  export const commentsSlice = createSlice({
    name:"comments",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
          },
          fetchSuccess: (state, action) => {
            state.loading = false;
            state.comments = [...action.payload];
          },
          fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
          },
          addComment:(state,action) => {
            state.comments = [...state.comments,action.payload]
          }
    }
  })
  export const {fetchStart,fetchSuccess,fetchFailure,addComment} = commentsSlice.actions
  export default commentsSlice.reducer