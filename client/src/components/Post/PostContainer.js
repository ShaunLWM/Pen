import React from "react";
import PostSubtitle from "./PostSubtitle";
import { Link } from "react-router-dom";

export default function PostContainer({ id, title }) {
    return (<header>
        {<Link to={`/id/${id}`} style={{ textDecoration: 'none' }}><h2 style={{ marginBottom: "0.4375rem" }}>{title}</h2></Link>}
        <PostSubtitle />
    </header>
    )
}