import Typography from '@material-ui/core/Typography';
import React from "react";

export default function PostBody({ body }) {
    return (
        <Typography style={{ marginTop: "10px" }} variant="body1" gutterBottom dangerouslySetInnerHTML={{
            __html: body,
        }} />
    )
}
