import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        name: '',
        startDate: null,
        endData: null
    },
    reducers: {
        changeName(state,action){
            state.name = action.payload;
        },
        changeStartDate(state,action){
            state.startDate = action.payload;
        },
        changeEndDate(state,action){
            state.endData = action.payload;
        }
    }
})

export const { changeName , changeStartDate, changeEndDate} = filterSlice.actions;
export default filterSlice.reducer;