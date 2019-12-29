import React from "react";
import { Link } from "react-router-dom";

export default function PostTitle({ id, title, shouldLink = true }) {
    if (shouldLink) {
        return (
            <Link to={`/id/${id}`} style={{ textDecoration: 'none' }}> <h2 style={{ marginBottom: "0px" }}>{title}</h2></Link>
        )
    }

    return (
        <h2 style={{ marginBottom: "0px" }}>{title}</h2>
    )
}