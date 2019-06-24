import React from "react";
import "./home.scss";
import { fetchAbout, fecthContacts } from "./homeAction";
import { Error } from "../error/Error";
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
    const { showAboutLoading, showContactLoading, errors } = this.props;
    let about;
    let join;
    let contact;

    if (!showAboutLoading && typeof errors === "undefined") {
      about = (
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
      );
    } else if (errors !== "undefined") {
      about = <Error message={errors} />;
    }

    if (!showAboutLoading && typeof errors === "undefined") {
      join = (
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
      );
    } else if (errors !== "undefined") {
      join = <Error message={errors} />;
    }

    if (!showContactLoading && typeof errors === "undefined") {
      contact = (
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
      );
    } else if (errors !== "undefined") {
      contact = <Error message={errors} />;
    }

    return (
      <div className="container">
        <div className="home-wrapper">
          <div className="history">
            <div className="history-content">
              <h2>HISTÓRIA</h2>
              {showAboutLoading ? (
                <div className="loader">
                  <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
                </div>
              ) : (
                about
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
              {showAboutLoading ? (
                <div className="loader">
                  <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
                </div>
              ) : (
                join
              )}
            </div>
            <div className="home-contact">
              <h2>CONTATO</h2>
              {this.props.showContactLoading === true ? (
                <div className="loader">
                  <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
                </div>
              ) : (
                contact
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let error = state.homeReducer.error;
  let about = state.homeReducer.about;
  let contact = state.homeReducer.contact;

  let showAboutLoading = true;
  let showContactLoading = true;

  if (typeof error !== "undefined") {
    showAboutLoading = false;
    showContactLoading = false;
  }

  if (typeof about !== "undefined") {
    showAboutLoading = false;
  }

  if (typeof contact !== "undefined") {
    showContactLoading = false;
  }

  return {
    about: state.homeReducer.about,
    contact: state.homeReducer.contact,
    errors: state.homeReducer.error,
    showAboutLoading: showAboutLoading,
    showContactLoading: showContactLoading
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
