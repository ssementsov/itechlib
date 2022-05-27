import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUser: {}
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isUser = action.payload;
        },
    },
});

export default userSlice.reducer;