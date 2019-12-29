import React, { useEffect } from "react";
import HeaderProfile from "./HeaderProfile";
import HeaderTitle from "./HeaderTitle";


export default function Header(props) {
  useEffect(() => { }, []);

  return (
    <>
      <HeaderTitle />
      <HeaderProfile />
    </>
  );
}
