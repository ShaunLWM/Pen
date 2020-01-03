import React, { useContext, forwardRef } from "react";
import { store } from "../../store";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const LinkBehavior = forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));

export default function HeaderTitle() {
    const globalState = useContext(store);
    return (
        <Link to={`/`} component={RouterLink} style={{ textDecoration: 'none' }}>
            <h1 className="header">{globalState["state"]["profile"]["name"]}</h1>
        </Link >
    );
}
