import { createSlice } from '@reduxjs/toolkit';
import { ListsAPI } from '../../api/lists-api';

const initialState = {
    usersList: [],
    isLoading: false,
    error: false,
};
export const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        itemsListsFetching(state) {
            state.isLoading = true;
        },
        usersListFetchingSuccess(state, action) {
            state.usersList = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        usersListFetchingError(state) {
            state.usersList = [];
            state.isLoading = false;
            state.error = true;
        },
    },
});

export default listsSlice.reducer;
export const { itemsListsFetching, usersListFetchingSuccess, usersListFetchingError } =
    listsSlice.actions;

//thunks
export const fetchUsersList = () => async (dispatch) => {
    dispatch(itemsListsFetching());
    ListsAPI.getUsersList()
        .then((res) => {
            dispatch(usersListFetchingSuccess(res.data));
        })
        .catch(() => {
            dispatch(usersListFetchingError());
        });
};
