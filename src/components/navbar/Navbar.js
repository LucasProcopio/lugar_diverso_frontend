import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

class Navbar extends React.Component {
  render() {
    return (
      <div className="nav-wrapper">
        <div className="item-wrapper">
          <div className="item">
            <NavLink to="/">O LUGAR DIVERSO</NavLink>
          </div>
          <div className="item">
            <NavLink to="/poem">ESCREVA SUA POESIA </NavLink>
          </div>

          <div className="item">
            <NavLink to="/wall">MURAL</NavLink>
          </div>
          <div className="item">
            <NavLink to="/event">EVENTOS</NavLink>
          </div>
        </div>
        <div className="item logo">
          LUGAR DI<span style={{ color: "red" }}>V</span>ERSO
        </div>
      </div>
    );
  }
}

export default Navbar;
