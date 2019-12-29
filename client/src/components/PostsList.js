import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import CustomContentLoader from "../lib/CustomContentLoader";
import CollapsedPost from "./CollapsedPost";
import { store } from "../store";

export default function PostsList() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getPosts() {
      setError(false);
      try {
        let results = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        setPosts(results.data);
        dispatch({ type: "setPosts", data: results.data })
      } catch (error) {
        console.log(error);
        setError(true);
      }

      setLoading(false);
    }

    getPosts();
  }, [dispatch]);

  if (isError) return (<h1>Error loading post</h1>);
  if (isLoading) return (<CustomContentLoader />);

  return (
    <>
      {
        posts.map(post => {
          return (
            <div key={post.id}>
              <CollapsedPost {...post} />
            </div>
          );
        })
      }
    </>
  );
}