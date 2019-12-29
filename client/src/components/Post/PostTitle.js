import React from "react";
import { Link } from "react-router-dom";

export default function PostTitle() {
    return (
        <Link to={`/id/${id}`} style={{ textDecoration: 'none' }}><h2 style={{ marginBottom: "0.4375rem" }}>{title}</h2></Link>
    )
}