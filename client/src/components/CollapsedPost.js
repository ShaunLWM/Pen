import cheerio from "cheerio";
import React, { useEffect, useState } from "react";
import PostBody from "./Post/PostBody";
import PostContainer from "./Post/PostContainer";

export default function CollapsedPost(props) {
    const [body, setBody] = useState(<div />);

    useEffect(() => {
        setBody(cheerio(props["post_body"]).find("p").first().html());
    }, [props]);

    return (
        <article>
            <PostContainer {...props} />
            <PostBody body={body} />
        </article>
    );
}
