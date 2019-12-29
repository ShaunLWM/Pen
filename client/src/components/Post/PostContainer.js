import React from "react";
import PostSubtitle from "./PostSubtitle";
import PostTitle from "./PostTitle";

export default function PostContainer(props) {
    return (
        <header>
            <PostTitle {...props} />
            <PostSubtitle />
        </header>
    )
}