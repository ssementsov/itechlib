import { combineReducers, configureStore } from '@reduxjs/toolkit';
import avatarReducer from './reducers/AvatarSlice';

const rootReducer = combineReducers({
    avatarReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
