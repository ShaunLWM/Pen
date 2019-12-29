import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from '@material-ui/core/styles';
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ExpandedPost from "./components/ExpandedPost";
import Header from "./components/Header";
import PostsList from "./components/PostsList";
import ThemeHelper from "./helpers/Theme";

function App() {
  return (
    <ThemeProvider theme={ThemeHelper}>
      <CssBaseline />
      <Header />
      <div id="about"></div>
      <Container maxWidth="sm">
        <Switch>
          <Route
            path="/id/:postId"
            render={props => <ExpandedPost {...props} />}
          />
          <Route exact path="/" component={PostsList} />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <footer></footer>
    </ThemeProvider>
  );
}

export default App;
