import React, { useEffect, useState, useContext } from "react";
import HeaderProfile from "./HeaderProfile";
import HeaderTitle from "./HeaderTitle";
import CustomContentLoader from "../../lib/CustomContentLoader";
import { serverUrl } from "../../App";
import { store } from "../../store";
import axios from "axios";

export default function Header() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        let results = await axios.get(`${serverUrl}/profile`);
        dispatch({ type: "setProfile", data: results.data })
      } catch (error) {
        console.error(error);
        setError(true);
      }

      setLoading(false);
    }

    if (typeof globalState["state"]["profile"]["img"] === "undefined") getProfile();
  }, [dispatch, globalState]);

  if (isLoading) return (<CustomContentLoader />);
  if (isError) return (<h1>Error loading profile</h1>);

  return (
    <div style={{ "marginBottom": "20px" }}>
      <HeaderTitle />
      <HeaderProfile />
    </div>
  );
}
