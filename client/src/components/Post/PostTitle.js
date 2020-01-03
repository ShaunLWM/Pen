import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    postTitle: {
        "font-size": "1.75rem",
        "margin-bottom": "0rem"
    },
});

const LinkBehavior = forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));

export default function PostTitle({ post_slug, post_title, shouldLink = true }) {
    const classes = useStyles();
    if (shouldLink)
        return (<Link component={RouterLink} to={`/id/${post_slug}`} style={{ textDecoration: 'none' }}> <h3 className={classes.postTitle}>{post_title}</h3></Link>)
    return (<h3 className={classes.postTitle}>{post_title}</h3>)
}

PostTitle.propTypes = {
    post_slug: PropTypes.string,
    post_title: PropTypes.string,
    shouldLink: PropTypes.bool
}
