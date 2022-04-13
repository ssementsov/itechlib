import { createSlice } from '@reduxjs/toolkit';
import { BooksAPI } from '../../api/books-api';

const initialState = {
    booksInUse: [],
    isLoading: false,
    error: false,
};
export const booksInUseSlice = createSlice({
    name: 'booksInUse',
    initialState,
    reducers: {
        booksInUseFetching(state) {
            state.isLoading = true;
        },
        booksInUseFetchingSuccess(state, action) {
            state.isLoading = false;
            state.error = '';
            state.booksInUse = action.payload;
        },
        booksInUseFetchingError(state) {
            state.booksInUse = [];
            state.isLoading = false;
            state.error = true;
        },
    },
});

export default booksInUseSlice.reducer;
export const { booksInUseFetching, booksInUseFetchingSuccess, booksInUseFetchingError } =
    booksInUseSlice.actions;

//thunks
export const fetchBooksInUse = () => async (dispatch) => {
    dispatch(booksInUseFetching());
    BooksAPI.getBooksInUse()
        .then((res) => {
            dispatch(booksInUseFetchingSuccess(res.data));
        })
        .catch(() => {
            dispatch(booksInUseFetchingError());
        });
};
