import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { IoIosSad } from "react-icons/io";
import "./footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        {this.props.showLoading ? (
          <div className="loader">
            <Loader type="Grid" color="#f1f1f1" height={35} width={35} />
          </div>
        ) : (
          <div className="footer-container">
            {this.props.contact.length === 0 ? (
              <div>
                <IoIosSad className="sad-icon" />
                <span>Nenhuma informação para mostrar</span>
              </div>
            ) : (
              <div className="footer-container">
                <div className="footer-contact">
                  Contato: {this.props.contact[0].phone}
                </div>
                <div className="instagram">
                  instagran: {this.props.contact[0].email}
                </div>
                <div className="address-footer">
                  Endereço: {this.props.contact[0].address}
                </div>
                <div className="city">{this.props.contact[0].city}</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.homeReducer.contact,
    showLoading: typeof state.homeReducer.contact === "undefined" ? true : false
  };
};
export default connect(mapStateToProps)(Footer);
