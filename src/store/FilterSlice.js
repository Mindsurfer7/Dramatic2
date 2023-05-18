import { createSlice } from "@reduxjs/toolkit";

// type FilterReducer = {
//   categoryID: number;
//   currentPage: number;
//   searchString: string;
//   sort: SortItem;
// };

const initialState = {
  searchString: "",
};

export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const { setSearchString } = filterReducer.actions;

export default filterReducer.reducer;
