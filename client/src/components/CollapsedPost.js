import React, { useEffect, useState } from "react";
import PostContainer from "./Post/PostContainer";
import Typography from '@material-ui/core/Typography';
import cheerio from "cheerio";

export default function CollapsedPost(props) {
    const [body, setBody] = useState(<div />);

    useEffect(() => {
        setBody(cheerio(props["post_body"]).find("p").first().html());
    }, [props]);

    return (
        <article>
            <PostContainer {...props} />
            <Typography style={{ "marginTop": "10px" }} variant="body1" gutterBottom dangerouslySetInnerHTML={{
                __html: body
            }} />
        </article>
    );
}