import { combineReducers, configureStore } from '@reduxjs/toolkit';
import avatarReducer from './reducers/AvatarSlice';
import booksInUseReducer from './reducers/BooksInUseSlice';
import userReducer from './reducers/UserSlice';
import internalNotificationsReducer from './reducers/InternalNotificationsSlice';

const rootReducer = combineReducers({
    user: userReducer,
    avatar: avatarReducer,
    booksInUse: booksInUseReducer,
    internalNotifications: internalNotificationsReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
