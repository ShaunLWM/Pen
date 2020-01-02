import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React, { useContext, useState, useEffect } from "react";
import { store } from "../../store";

export default function HeaderProfile() {
    const globalState = useContext(store);
    const [profile, setProfile] = useState("");

    useEffect(() => {
        let p = globalState["profile"]["description"].map(e => {
            return <span>{e}</span>
        }).join(<br />)
        setProfile(p);
    }, [globalState]);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Avatar alt="me!" src={globalState["profile"]["img"]} />
                </Grid>
                <Grid item xs={10}>
                    <div dangerouslySetInnerHTML={{ __html: profile }} />
                </Grid>
            </Grid>
        </>
    )
}