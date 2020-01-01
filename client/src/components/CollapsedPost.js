import React from "react";
import Truncate from "react-truncate-html";
import PostContainer from "./Post/PostContainer";

export default function CollapsedPost(props) {
    return (
        <article>
            <PostContainer {...props} />
            <Truncate
                lines={3}
                dangerouslySetInnerHTML={{
                    __html: props["post_body"]
                }}
            />
        </article>
    );
}