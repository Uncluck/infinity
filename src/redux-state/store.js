import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from "./reducer/usersSlice";


export const store = configureStore({
    reducer: {
        users: userSlice,
    },
});
