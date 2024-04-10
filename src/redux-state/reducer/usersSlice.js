import {createSlice} from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        selectedUser: null,
    },
    reducers: {
        addSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        updateSelectedUserField: (state, action) => {
            const {field, value} = action.payload;
            state.selectedUser = {
                ...state.selectedUser,
                [field]: value}
        },
        saveUpdatedUser: (state) => {
            state.data = state.data.map(user => {
                if (user.id === state.selectedUser.id) {
                    return state.selectedUser
                }
                return user;
            });
        },
        fetchDataSuccess: (state, action) => {
            const newUsers = action.payload.filter(newUserData =>
                !state.data.some(existingUser =>
                    existingUser.id === newUserData.id));
            state.data = [...state.data, ...newUsers];
        },
    },
});

export const {reducer: userSlice} = UserSlice;
export const {addSelectedUser, updateSelectedUserField, saveUpdatedUser, fetchDataSuccess} = UserSlice.actions;