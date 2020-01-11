import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React, { useContext, useEffect, useState } from "react";
import { serverUrl } from "../../config";
import useDarkMode from "../../lib/useDarkMode";
import { store } from "../../store";

export default function HeaderProfile() {
    const globalState = useContext(store);
    const [profile, setProfile] = useState("");
    const [, toggleDarkMode] = useDarkMode();

    useEffect(() => {
        const p = globalState["state"]["profile"]["profile_description"].map((e) => `<span>${e}.</span>`).join("<br />");
        setProfile(p);
    }, [globalState]);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Avatar onClick={toggleDarkMode} alt="me!" src={`${serverUrl}/img/${globalState["state"]["profile"]["profile_image"]}`} />
                </Grid>
                <Grid item xs={10}>
                    <div dangerouslySetInnerHTML={{ __html: profile }} />
                </Grid>
            </Grid>
        </>
    );
}
