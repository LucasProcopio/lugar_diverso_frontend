import React from "react";
import { verifyAuth } from "../../utils/helpers";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./admin.scss";

class Admin extends React.Component {
  componentDidMount() {
    verifyAuth(this.props);
  }

  render() {
    return (
      <div className="container">
        <div className="items-wrapper">
          <NavLink to="/accept-poems" className="admin-item">
            Poemas publicados
          </NavLink>
          <NavLink to="/create-event" className="admin-item">
            Publicar eventos
          </NavLink>
          <NavLink to="/config-event" className="admin-item">
            Eventos publicados
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = state => {
  return {
    token: state.loginReducer.token
  };
};

export default connect(mapsStateToProps)(Admin);
