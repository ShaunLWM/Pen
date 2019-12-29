import React from 'react';
import PostContainer from "./Post/PostContainer";

export default function CollapsedPost(props) {
    // const classes = useStyles();

    return (
        <article>
            <PostContainer {...props} />
            <p>{props["body"].split("\n")[0]}</p>
        </article>
    );
}