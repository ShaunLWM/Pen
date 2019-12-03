import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import CollapsedPost from "./components/CollapsedPost";
import ExpandedPost from "./components/ExpandedPost";
import Header from "./components/Header";
import PostsLoader from "./lib/PostsLoader";

function App() {
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

        // await sleep(5000);
        setPosts(results.data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    }

    getPosts();
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <div id="about"></div>
      <Container maxWidth="sm">
        <Switch>
          <Route
            path="/id/:postId"
            render={props => <ExpandedPost {...props} />}
          />
          <Route exact path="/">
            {isLoading ? (
              <PostsLoader />
            ) : (
              posts.map(post => {
                return (
                  <div key={post.id}>
                    <Link to={`/id/${post.id}`}>
                      <CollapsedPost {...post} />
                    </Link>
                  </div>
                );
              })
            )}
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <footer></footer>
    </>
  );
}

export default App;
