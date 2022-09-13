import { combineReducers, configureStore } from '@reduxjs/toolkit';
import avatarReducer from './reducers/AvatarSlice';
import booksInUseReducer from './reducers/BooksInUseSlice';
import userReducer from './reducers/UserSlice';
import listsReducer from './reducers/ListsSlice';
import loadingStatusReducer from './reducers/LoadingStatusSlice';

const rootReducer = combineReducers({
    user: userReducer,
    avatar: avatarReducer,
    booksInUse: booksInUseReducer,
    lists: listsReducer,
    loadingStatus: loadingStatusReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
