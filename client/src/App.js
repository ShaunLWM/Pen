import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from '@material-ui/core/styles';
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ExpandedPost from "./components/ExpandedPost";
import Header from "./components/Header/";
import PostsList from "./components/PostsList";
import ThemeHelper from "./helpers/Theme";

function App() {
  return (
    <ThemeProvider theme={ThemeHelper}>
      <Container maxWidth="sm">
        <CssBaseline />
        <Header />
        <div id="about"></div>
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
