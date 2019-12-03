import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ExpandedPost(props) {
    let history = useHistory();

    useEffect(() => {
        if (typeof props.match.params === "undefined") return history.push("/");
        let id = props.match.params["postId"];
        console.log(`PostId: ${id}`);
    }, []);

    return (
        <h1>HELLO</h1>
    )
}