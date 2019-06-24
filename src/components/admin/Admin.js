import React from "react";
import { checkAuth } from "../../utils/api";
import { connect } from "react-redux";

class Admin extends React.Component {
  componentDidMount() {
    const { token } = this.props;
    if (typeof token !== "undefined") {
      checkAuth(token).catch(err => {
        if (typeof err.response === "undefined") {
          alert(err);
          this.props.history.push("/login");
        } else if (typeof err.response.data !== "undefined") {
          this.props.history.push({
            pathname: "/login",
            state: { errors: err.response.data }
          });
        }
      });
    } else {
      this.props.history.push({
        pathname: "/login",
        state: { errors: "Sessão expirada por favor logue novamente." }
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="accept-poems">Poemas publicados</div>
        <div className="create-events">Publicar eventos</div>
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
