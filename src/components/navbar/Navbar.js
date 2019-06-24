import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

class Navbar extends React.Component {
  render() {
    return (
      <div className="nav-wrapper">
        <div className="item-wrapper">
          <div className="item">
            <NavLink to="/">
              <span className="line-break">O LUGAR</span>
              <span>DIVERSO</span>
            </NavLink>
          </div>
          <div className="item">
            <span className="pipe-one" />
            <NavLink to="/poem">
              <span className="line-break">ESCREVA </span>
              <span>SUA POESIA </span>
            </NavLink>
          </div>

          <div className="item">
            <NavLink to="/wall">
              <span>MURAL</span>
            </NavLink>
            <span className="pipe-two" />
          </div>
          <div className="item">
            <NavLink to="/event">
              <span>EVENTOS</span>
            </NavLink>
          </div>
        </div>
        <div className="item logo">
          <span className="first-line">LUGAR</span>{" "}
          <span className="second-line">
            DI<span style={{ color: "red" }}>V</span>ERSO
          </span>
        </div>
      </div>
    );
  }
}

export default Navbar;
