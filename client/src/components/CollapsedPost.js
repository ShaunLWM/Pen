import React from 'react';
import PostContainer from "./Post/PostContainer";

export default function CollapsedPost({ id, title, body }) {
    // const classes = useStyles();

    return (
        <article>
            <PostContainer />
            <p>{body.split("\n")[0]}</p>
        </article>
    );
}