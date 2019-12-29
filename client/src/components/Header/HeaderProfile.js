import React from "react";
import Grid from '@material-ui/core/Grid';

export default function HeaderProfile() {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <img style={{ height: "50px", borderRadius: "200px" }} alt="me!" src="/img/me.png" />
                </Grid>
                <Grid item xs={10}>
                    <span>Personal blog by Dan Abramov. </span>
                    <br />
                    <span>I explain with words and code.</span>
                </Grid>
            </Grid>
        </>
    )
}