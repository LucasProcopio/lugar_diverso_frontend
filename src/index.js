import React from "react";
import ReactDOM from "react-dom";
import { Navbar, Home, Poem, Wall, Event, Slider } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";

ReactDOM.render(
  <Router>
    <div>
      <Navbar />
      <Slider />
      <Route exact={true} path="/home" component={Home} />
      <Route path="/poem" component={Poem} />
      <Route path="/wall" component={Wall} />
      <Route path="/event" component={Event} />
    </div>
  </Router>,
  document.getElementById("root")
);
