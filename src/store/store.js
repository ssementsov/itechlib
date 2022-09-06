import { combineReducers, configureStore } from '@reduxjs/toolkit';
import avatarReducer from './reducers/AvatarSlice';
import booksInUseReducer from './reducers/BooksInUseSlice';
import userReducer from './reducers/UserSlice';
import listsReducer from './reducers/ListsSlice'

const rootReducer = combineReducers({
    user: userReducer,
    avatar: avatarReducer,
    booksInUse: booksInUseReducer,
    lists: listsReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
