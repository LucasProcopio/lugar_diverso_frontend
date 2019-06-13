import React from "react";
import ReactDOM from "react-dom";
import { Navbar, Home, Poem, Wall, Event, Admin } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Navbar />
      <Route exact={true} path="/" component={Home} />
      <Route path="/poem" component={Poem} />
      <Route path="/wall" component={Wall} />
      <Route path="/event" component={Event} />
    </div>
  </Router>,
  document.getElementById("root")
);
