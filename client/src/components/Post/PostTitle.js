import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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

PostTitle.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    shouldLink: PropTypes.bool
}