import Link from '@material-ui/core/Link';
import React, { useContext } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { store } from "../../store";

export default function HeaderTitle() {
    const globalState = useContext(store);
    return (
        <Link to={`/`} component={RouterLink} style={{ textDecoration: 'none' }}>
            <h1 className="header">{globalState["state"]["profile"]["profile_name"]}</h1>
        </Link >
    );
}
