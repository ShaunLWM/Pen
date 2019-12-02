import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
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
      <Router>
        <Container maxWidth="sm">
          <Route>
            <Switch>
              <Route exact path="/">
                {isLoading ? (
                  <PostsLoader />
                ) : (
                    posts.map(post => {
                      return (
                        <>
                          <Link to={`/id/${post.id}`} key={post.id}>
                            <CollapsedPost {...post} />
                          </Link>
                        </>
                      );
                    })
                  )}
              </Route>
              <Route path="/id/:postId" render={props =>
                <ExpandedPost {...props} />
              } />
            </Switch>
          </Route>

        </Container>
      </Router>
      <footer></footer>
    </>
  );
}

export default App;
