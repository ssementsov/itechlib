import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingButton: false,
};
export const loadingStatusSlice = createSlice({
    name: 'loadingStatus',
    initialState,
    reducers: {
        setLoadingButton(state, action) {
            state.isLoadingButton = action.payload;
        },
    },
});

export default loadingStatusSlice.reducer;
export const { setLoadingButton } =
    loadingStatusSlice.actions;