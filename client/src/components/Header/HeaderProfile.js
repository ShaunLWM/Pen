import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React from "react";

export default function HeaderProfile() {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Avatar alt="me!" src="/img/me.png" />
                </Grid>
                <Grid item xs={10}>
                    <span>Personal blog by Shaun.</span>
                    <br />
                    <span>I explain with words and code.</span>
                </Grid>
            </Grid>
        </>
    )
}