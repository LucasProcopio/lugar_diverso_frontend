import React from "react";
import "./home.scss";
import { fetchAbout, fecthContacts } from "./homeAction";

import Loader from "react-loader-spinner";
import { IoIosSad } from "react-icons/io";

import { connect } from "react-redux";
import { isEmpty } from "../../utils/helpers";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchAboutData();
    this.props.fetchContactData();
  }
  render() {
    return (
      <div className="container">
        <div className="history">
          <div className="history-content">
            <h2>HISTÓRIA</h2>
            {this.props.showAboutLoading === true ? (
              <div className="loader">
                <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
              </div>
            ) : (
              <div className="history-desc">
                {isEmpty(this.props.about) ? (
                  <div>
                    <IoIosSad className="sad-icon" />
                    <span>Nenhuma informação para mostrar</span>
                  </div>
                ) : (
                  this.props.about[0].history
                )}
              </div>
            )}
          </div>
        </div>
        <div className="home-imgs">
          <div className="img-one">
            <img src="/images/home/home-1.jpeg" width="280" alt="home 1" />
          </div>
          <div className="img-two">
            <img src="/images/home/home-2.jpeg" width="280" alt="home 2" />
          </div>
        </div>
        <div className="home-info">
          <div className="how-to-join">
            <h2>COMO PARTICIPAR</h2>
            {this.props.showAboutLoading === true ? (
              <div className="loader">
                <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
              </div>
            ) : (
              <div className="join-desc">
                {isEmpty(this.props.about) ? (
                  <div>
                    <IoIosSad className="sad-icon" />
                    <span>Nenhuma informação para mostrar</span>
                  </div>
                ) : (
                  this.props.about[0].join_desc
                )}
              </div>
            )}
          </div>
          <div className="home-contact">
            <h2>CONTATO</h2>
            {this.props.showContactLoading === true ? (
              <div className="loader">
                <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
              </div>
            ) : (
              <div className="contact-info">
                {this.props.contact.length === 0 ? (
                  <div>
                    <IoIosSad className="sad-icon" />
                    <span>Nenhuma informação para mostrar</span>
                  </div>
                ) : (
                  <div>
                    {this.props.contact[0].phone}
                    <br />
                    {this.props.contact[0].email}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    about: state.homeReducer.about,
    contact: state.homeReducer.contact,
    showAboutLoading:
      typeof state.homeReducer.about === "undefined" ? true : false,
    showContactLoading:
      typeof state.homeReducer.contact === "undefined" ? true : false
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAboutData: () => dispatch(fetchAbout()),
  fetchContactData: () => dispatch(fecthContacts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
