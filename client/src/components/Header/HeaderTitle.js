import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeaderTitle() {
    useEffect(() => { }, []);

    return (
        <Link to={`/`} style={{ textDecoration: 'none' }}>
            <h1 className="header">Shaun</h1>
        </Link >
    );
}
