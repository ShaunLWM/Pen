import React from "react";
import HeaderProfile from "./HeaderProfile";
import HeaderTitle from "./HeaderTitle";

export default function Header() {
  return (
    <div style={{ "marginBottom": "20px" }}>
      <HeaderTitle />
      <HeaderProfile />
    </div>
  );
}
