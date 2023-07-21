import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createPostServer,
  readPostsServer,
  createCommentServer,
} from '../../service/firebase';

export const createPost = createAsyncThunk(
  'posts/create',
  async (newPost, { rejectWithValue }) => {
    try {
      const postId = await createPostServer(newPost);
      return {...newPost, id: postId};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const readPosts = createAsyncThunk(
  'posts/read',
  async (_, { rejectWithValue }) => {
    try {
      const postsList = await readPostsServer();
      return postsList;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

export const createComment = createAsyncThunk(
  'comment/create',
  async (data, { rejectWithValue }) => {
    try {
      const postAndCommentData = await createCommentServer(data);
      return postAndCommentData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)