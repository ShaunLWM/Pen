import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import React from "react";

export default function PostBody({ body }) {
    return (
        <Typography style={{ marginTop: "10px" }} variant="body1" gutterBottom dangerouslySetInnerHTML={{
            __html: body,
        }} />
    );
}

PostBody.propTypes = {
    body: PropTypes.object,
};
