import React from "react";
import { Link } from "react-router-dom";

export default function HeaderTitle() {
    return (
        <Link to={`/`} style={{ textDecoration: 'none' }}>
            <h1 className="header">Shaun</h1>
        </Link >
    );
}
