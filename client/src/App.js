import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import Saved from "./pages/Saved";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/favorites" component={Saved} />
            <Route exact path="/posts/:id" component={Detail} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
