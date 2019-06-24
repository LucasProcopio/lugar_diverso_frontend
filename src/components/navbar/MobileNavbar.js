import React from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

class MobileNavbar extends React.Component {
  state = {
    menuOpen: false
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <Menu width={280}>
        <NavLink
          onClick={() => this.closeMenu()}
          id="home"
          className="menu-item"
          to="/"
        >
          O Lugar diverso
        </NavLink>
        <NavLink
          onClick={() => this.closeMenu()}
          id="about"
          className="menu-item"
          to="/poem"
        >
          Escreva sua poesia
        </NavLink>
        <NavLink
          onClick={() => this.closeMenu()}
          id="contact"
          className="menu-item"
          to="/wall"
        >
          Mural
        </NavLink>
        <NavLink
          onClick={() => this.closeMenu()}
          id="contact"
          className="menu-item"
          to="/event"
        >
          Eventos
        </NavLink>
      </Menu>
    );
  }
}

export default MobileNavbar;
