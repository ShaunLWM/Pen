import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    lastUpdated: 0,
    posts: [],
    post: {},
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPost(state, action) { state["post"] = action.payload },
        setPosts(state, action) {
            state["lastUpdated"] = new Date();
            state["posts"] = action.payload;
        }
    }
})

export const { setPost, setPosts } = postSlice.actions;
export default postSlice.reducer;

