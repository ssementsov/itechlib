import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingAvatar: false,
    isUploadedAvatar: false,
    isUpdatedAvatar: false,
    avatarData: null,
};
export const avatarSlice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
        setIsLoadingAvatar(state, action) {
            state.isLoadingAvatar = action.payload;
        },
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
