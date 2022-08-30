import { createSlice } from '@reduxjs/toolkit';
import { InternalNotificationsAPI } from '../../api/internal-notifications-api';

const initialState = {
    internalNotifications: [],
    isLoading: false,
    error: false,
};
export const internalNotificationsSlice = createSlice({
    name: 'internalNotifications',
    initialState,
    reducers: {
        internalNotificationsFetching(state) {
            state.isLoading = true;
        },
        internalNotificationsFetchingSuccess(state, action) {
            state.isLoading = false;
            state.error = '';
            state.internalNotifications = action.payload;
        },
        internalNotificationsFetchingError(state) {
            state.internalNotifications = [];
            state.isLoading = false;
            state.error = true;
        },
    },
});

export default internalNotificationsSlice.reducer;
export const { internalNotificationsFetching, internalNotificationsFetchingSuccess, internalNotificationsFetchingError } =
    internalNotificationsSlice.actions;

//thunks
export const fetchInternalNotifications = (userId) => async (dispatch) => {
    dispatch(internalNotificationsFetching());
    InternalNotificationsAPI.getInternalNotificationsList(userId)
        .then((res) => {
            dispatch(internalNotificationsFetchingSuccess(res.data));
        })
        .catch(() => {
            dispatch(internalNotificationsFetchingError());
        });
};
