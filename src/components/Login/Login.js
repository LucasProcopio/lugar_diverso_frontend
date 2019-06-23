import React from "react";
import { auth } from "../../utils/api";
import { connect } from "react-redux";
import { fetchAdmToken } from "./loginAction";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    auth(this.state)
      .then(res => {
        if (res.status === 200) {
          fetchAdmToken(res.data.token);
          this.props.history.push("/admin");
        }
      })
      .catch(err => {
        if (typeof err.resonse !== "undefined") {
          alert(err.response.data.errors);
        }
      });
  };

  render() {
    console.log(document.cookie);
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default connect()(Login);
