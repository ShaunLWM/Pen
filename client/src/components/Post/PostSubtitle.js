/* eslint-disable camelcase */
import PropTypes from "prop-types";
import React from "react";

require("date-format-lite");

export default function PostSubtitle({ post_reading_time, post_date }) {
    return (
        <small style={{ marginBottom: "5px" }}>{post_date.date("D MMMM YYYY")} • <span role="img" aria-label="coffee">{"☕️".repeat(Math.ceil(post_reading_time / 5.0))}</span> {post_reading_time} min read.</small>
    );
}

PostSubtitle.propTypes = {
    post_reading_time: PropTypes.number,
    post_date: PropTypes.number,
};
