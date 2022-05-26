import { combineReducers, configureStore } from '@reduxjs/toolkit';
import avatarReducer from './reducers/AvatarSlice';
import booksInUseReducer from './reducers/BooksInUseSlice';
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
    user: userReducer,
    avatar: avatarReducer,
    booksInUse: booksInUseReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
