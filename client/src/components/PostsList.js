import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { serverUrl } from "../App";
import CustomContentLoader from "../lib/CustomContentLoader";
import { store } from "../store";
import CollapsedPost from "./CollapsedPost";

export default function PostsList() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const results = await axios.get(serverUrl);
        setPosts(results.data);
        dispatch({ type: "setPosts", data: results.data })
      } catch (error) {
        console.error(error);
        setError(true);
      }

      setLoading(false);
    }

    getPosts();
  }, [dispatch]);

  if (isLoading) return (<CustomContentLoader />);
  if (isError) return (<h1>Error loading post</h1>);

  return (
    <>
      {
        posts.map((post) => {
          return (
            <div key={post["post_id"]}>
              <CollapsedPost {...post} />
              <hr style={{ marginTop: "10px" }} />
            </div>
          );
        })
      }
    </>
  );
}
