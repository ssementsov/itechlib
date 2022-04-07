import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUploadedAvatar: false,
    isUpdatedAvatar: false,
    avatarData: {},
};
export const avatarSlice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
        uploadAvatar(state, action) {
            state.isUploadedAvatar = action.payload;
        },
        updateAvatar(state, action) {
            state.isUpdatedAvatar = action.payload;
        },
        setAvatarData(state, action) {
            state.avatarData = action.payload;
        },
        deleteAvatarData(state) {
            state.avatarData = {};
        },
    },
});

export default avatarSlice.reducer;
