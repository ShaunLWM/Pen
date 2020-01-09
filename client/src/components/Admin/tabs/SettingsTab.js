import TextField from '@material-ui/core/TextField';
import React from "react";

export default function SettingsTab() {
    return (
        <form noValidate autoComplete="off">
            <TextField id="input-profile-name" label="Name" fullWidth />
            <br />
            <TextField id="input-profile-description" label="Description (2 lines)" fullWidth multiline rowsMax="2" />
        </form>
    )
}
