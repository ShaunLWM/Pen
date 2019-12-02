import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import CollapsedPost from "./components/CollapsedPost";
import PostsLoader from "./lib/PostsLoader";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  useEffect(() => {
    async function getPosts() {
      setError(false);
      try {
        let posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
        await sleep(5000);
        console.log(posts);
        setPosts(posts.data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    }

    getPosts();
  }, []);

  return (
    <Router>

      <CssBaseline />
      <header></header>
      <div id="about"></div>
      <Container maxWidth="sm">
        {isLoading ? <PostsLoader /> :
          posts.map(post => {
            return (
              <>
                <Link to={`/to/${post.id}`}>
                  <CollapsedPost title={post.title} />
                </Link>
              </>
            )
          })
        }
      </Container>
      <footer></footer>
    </Router>
  );
}

export default App;
