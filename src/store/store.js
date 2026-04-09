import { configureStore } from "@reduxjs/toolkit";
import campaignsReducer from "./campaignSlice";
import usersReducer from "./usersSlice";
import filtersReducer from './filterSlice'

const store = configureStore({
    reducer:{
        campaigns: campaignsReducer,
        users: usersReducer,
        filters: filtersReducer
    }
})

export default store;