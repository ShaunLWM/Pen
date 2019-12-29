import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomContentLoader from "../lib/CustomContentLoader";
import CollapsedPost from "./CollapsedPost";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    console.log("mount: post list");
    async function getPosts() {
      setError(false);
      try {
        let results = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        setPosts(results.data);
      } catch (error) {
        console.log(error);
        setError(true);
      }

      setLoading(false);
    }

    getPosts();
  }, []);

  if (isError) return (<h1>Error loading post</h1>);
  if (isLoading) return (<CustomContentLoader />);

  return (
    <>
      {
        posts.map(post => {
          return (
            <div key={post.id}>
              <Link to={`/id/${post.id}`}>
                <CollapsedPost {...post} />
              </Link>
            </div>
          );
        })}
    </>
  );
}
