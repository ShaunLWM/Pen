import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../../store";

export default function HeaderTitle() {
    const globalState = useContext(store);
    return (
        <Link to={`/`} style={{ textDecoration: 'none' }}>
            <h1 className="header">{globalState["profile"]["name"]}</h1>
        </Link >
    );
}
