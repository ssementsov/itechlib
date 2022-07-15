import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        id: 0,
        name: '',
        surname: '',
        corpEmail: '',
        googleEmail: '',
        roles: [],
        fileInfo: null,
    },
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        updateUserRoles(state, action) {
            state.user.roles.push(action.payload);
        },
    },
});

export default userSlice.reducer;