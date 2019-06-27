import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import log from "./middleware/log";

import {
  Navbar,
  MobileNavBar,
  Home,
  Poem,
  Wall,
  Event,
  Slider,
  Footer,
  Admin,
  Login,
  Accept,
  CreateEvent,
  ConfigEvent,
  Profile
} from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";

const store = createStore(reducer, applyMiddleware(thunk, log));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <div className="mobile-navbar">
          <MobileNavBar />
        </div>
        <div className="navbar">
          <Navbar />
        </div>
        <Slider />
        <Route exact={true} path="/" component={Home} />
        <Route path="/poem" component={Poem} />
        <Route path="/wall" component={Wall} />
        <Route path="/event" component={Event} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/accept-poems" component={Accept} />
        <Route path="/create-event" component={CreateEvent} />
        <Route path="/config-event" component={ConfigEvent} />
        <Route path="/update-profile" component={Profile} />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
