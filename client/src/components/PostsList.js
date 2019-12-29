import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CustomContentLoader from "../lib/CustomContentLoader";
import { setPosts } from "../store/PostReducer";
import CollapsedPost from "./CollapsedPost";
const mapDispatch = { setPosts };

const PostsList = ({ setPosts }) => {
  const [posts, setAllPosts] = useState([]);
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
        setAllPosts(results.data)
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
              <CollapsedPost {...post} />
            </div>
          );
        })
      }
    </>
  );
}

export default connect(null, mapDispatch)(PostsList);