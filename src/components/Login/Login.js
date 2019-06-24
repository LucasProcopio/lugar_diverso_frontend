import React from "react";
import { auth } from "../../utils/api";
import { connect } from "react-redux";
import { fetchAdmToken } from "./loginAction";
import { ToastContainer, toast } from "react-toastify";
import { fetchAbout, fecthContacts } from "../home/homeAction";

import "./login.scss";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  componentDidMount() {
    const historyState = this.props.location.state;
    this.props.fetchAboutData();
    this.props.fetchContactData();

    if (typeof historyState !== "undefined") {
      toast.error(`Ops! 😰 ${historyState.errors}`, {
        position: "top-center"
      });
    }
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  error = err => {
    return <div className="error-login">{err}</div>;
  };

  onSubmit = event => {
    event.preventDefault();
    auth(this.state)
      .then(res => {
        if (res.status === 200) {
          this.props.fetchTokenData(res.data.token);
          this.props.history.push({
            pathname: "/admin"
          });
        }
      })
      .catch(err => {
        if (typeof err.response === "undefined") {
          this.setState({ error: "Servidor indisponivel" });
        } else if (typeof err.response.data !== "undefined") {
          this.setState({ error: err.response.data.errors });
        }
      });
  };

  render() {
    let Error;
    if (this.state.error) {
      Error = this.error(this.state.error);
    }

    return (
      <div className="container">
        <ToastContainer />
        <form className="form-login" onSubmit={this.onSubmit}>
          <h2 className="login-header">LOGIN</h2>
          {Error}
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input className="submit-input" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAboutData: () => dispatch(fetchAbout()),
  fetchContactData: () => dispatch(fecthContacts()),
  fetchTokenData: token => dispatch(fetchAdmToken(token))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
