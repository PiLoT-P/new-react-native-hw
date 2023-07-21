import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../auth/authOperation";
const authSlice = createSlice({
    name: 'authorized',
    initialState: {
        user: { uid: null, name: null, email: null, avatar: null },
        token: null,
        refreshToken: null,
        authorized: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
                state.authorized = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
                state.authorized = true;
            })
            .addCase(logout.fulfilled, state => {
                state.user.uid = null;
                state.user.name = null;
                state.user.email = null;
                state.user.avatar = null;
                state.token = null;
                state.refreshToken = null;
                state.authorized = false;
            })
            .addMatcher(
                action => action.type.endsWith('/fulfilled'),
                state => {
                    state.error = null;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, { payload }) => {
                    state.error = payload;
                }
            )
    }
});

export default authSlice.reducer;