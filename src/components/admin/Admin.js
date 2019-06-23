import React from "react";
import { getAdmList, checkAuth } from "../../utils/api";
import { connect } from "react-redux";

class Admin extends React.Component {
  state = {
    message: "Loading..."
  };

  componentDidMount() {
    checkAuth(this.props.token)
      .then(res => this.setState({ message: "Atutenticado" }))
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            this.props.history.push("/login");
          } else {
            alert(err.response.data);
          }
        }
      });
  }
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.loginReducer.token
  };
};
export default connect(mapStateToProps)(Admin);
