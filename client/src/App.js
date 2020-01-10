import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin";
import ExpandedPost from "./components/ExpandedPost";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostsList from "./components/PostsList";
import { createTheme } from "./helpers/Utils";
import { store } from "./store";

function App() {
  const globalState = useContext(store);

  return (
    <ThemeProvider theme={createMuiTheme(createTheme(globalState["state"]["currentTheme"]))}>
      <Container maxWidth="sm">
        <CssBaseline />
        <Header />
        <Switch>
          <Route
            path="/id/:postSlug"
            render={(props) => <ExpandedPost {...props} />}
          />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/" component={PostsList} />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
