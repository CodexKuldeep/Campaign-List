import { createSlice } from "@reduxjs/toolkit";
import { CAMPAIGN_DATA } from "../../data";

const campaignSlice = createSlice({
    name: 'campaigns',
    initialState: {
        items: CAMPAIGN_DATA
    },
    reducers: {
        addCampaigns(state, action){
            state.items = [...state.items,...action.payload];
        }
    }
});

export const { addCampaigns} = campaignSlice.actions;
export default campaignSlice.reducer;