import { combineReducers, configureStore } from '@reduxjs/toolkit';
import avatarReducer from './reducers/AvatarSlice';
import booksInUseReducer from './reducers/BooksInUseSlice';

const rootReducer = combineReducers({
    avatar: avatarReducer,
    booksInUse: booksInUseReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
