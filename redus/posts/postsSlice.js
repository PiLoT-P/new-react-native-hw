import { createSlice } from "@reduxjs/toolkit";

import { createPost, readPosts, createComment } from "../posts/postsOperation";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, { payload }) => {
                state.items.push({ post: payload, postId: payload.id });
            })
            .addCase(readPosts.fulfilled, (state, { payload }) => {
                state.items = payload;
            })
            .addCase(createComment.fulfilled, (state, { payload }) => {
                const {postId, avatarImage, comment, date, } = payload;
                    state.items.map(el => 
                        el.postId !== postId
                            ? el
                            : el.post.comments.push({
                                avatarImage,
                                comment,
                                date
                            }))
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

export default postsSlice.reducer;