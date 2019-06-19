import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import log from "./middleware/log";

import { Navbar, Home, Poem, Wall, Event, Slider } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";

const store = createStore(reducer, applyMiddleware(thunk, log));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Slider />
        <Route exact={true} path="/home" component={Home} />
        <Route path="/poem" component={Poem} />
        <Route path="/wall" component={Wall} />
        <Route path="/event" component={Event} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
