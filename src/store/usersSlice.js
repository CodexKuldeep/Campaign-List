import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetchusers',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){
            throw new Error('Fetching User details got failed');
        }
        const data =  await response.json();
        return data;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        items: {},
        status: 'idle',
        error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) =>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled,(state,action) => {
            state.status = 'succeedded';
            const usersMap = {};
            action.payload.forEach(user => {
                usersMap[user.id] = user.name;
            });
            state.items = usersMap;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;