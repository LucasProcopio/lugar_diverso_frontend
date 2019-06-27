import React from "react";
import { fetchNotAccepted, deletePoem, acceptPoem } from "../wall/wallAction";
import { verifyAuth } from "../../utils/helpers";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { confirmAlert } from "react-confirm-alert";
import { MdReply } from "react-icons/md";
import { Error } from "../error/Error";

import "../wall/wall.scss";
import "react-confirm-alert/src/react-confirm-alert.css";

class Accept extends React.Component {
  componentDidMount() {
    verifyAuth(this.props);
    this.props.dispatch(fetchNotAccepted(1));
  }

  handleAccept = id => {
    confirmAlert({
      title: "Deseja mesmo aceitar este poema ?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Sim",
          onClick: () => this.props.dispatch(acceptPoem(id))
        },
        {
          label: "Não",
          onClick: () => null
        }
      ]
    });
  };

  handleDelete = id => {
    confirmAlert({
      title: "Quer mesmo deletar ?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Sim",
          onClick: () => this.props.dispatch(deletePoem(id))
        },
        {
          label: "Não",
          onClick: () => null
        }
      ]
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { pages, showLoading, error, poems } = this.props;
    const pageItems = [];
    let poemData;

    if (pages !== "undefined") {
      for (let i = 1; i <= pages; i++) {
        pageItems.push(
          <span
            key={i}
            className="page-item"
            onClick={() => this.props.dispatch(fetchNotAccepted(i))}
          >
            {i}
          </span>
        );
      }
    }

    if (!showLoading && typeof error === "undefined") {
      if (poems.length === 0) {
        poemData = <Error message="Ainda não foi cadastrado nenhum poema 😔" />;
      } else {
        poemData = poems.map((poem, index) => (
          <div className="poem" key={index}>
            {poem.image !== "" ? (
              <div
                className="poem-img"
                style={{ backgroundImage: `url(${poem.image})` }}
              />
            ) : null}
            <div className="poem-body">
              <h3>{poem.title}</h3>
              <p className="author">Por: {poem.author}</p>
              <p className="poem-text">
                {poem.text.split("\n").map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="button-wrapper">
              <button
                className="btn-poem accept-poem"
                onClick={() => this.handleAccept(poem.id)}
              >
                Aceitar
              </button>

              <button
                className="btn-poem delete-poem"
                onClick={() => this.handleDelete(poem.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ));
      }
    } else if (typeof error !== "undefined") {
      poemData = <Error message={error} />;
    }

    return (
      <div className="container wall-container">
        <div className="go-back" onClick={() => this.handleBack()}>
          <MdReply size={26} color="#f1f1f1" className="go-back-icon" />
        </div>
        <div className="content">
          <div className="poems-wrapper">
            {showLoading === true ? (
              <div className="wall-loader">
                <Loader type="Grid" color="#f1f1f1" height={100} width={100} />
              </div>
            ) : (
              poemData
            )}
          </div>
          <div className="wall-pagination">
            <div className="paging">{pageItems.map(item => item)}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let poems = state.wallReducer.results;
  let pages = state.wallReducer.pages;
  let total = state.wallReducer.count;
  let error = state.wallReducer.error;
  let token = state.loginReducer.token;

  let showLoading = true;

  if (typeof error !== "undefined") {
    showLoading = false;
  }

  if (typeof poems !== "undefined") {
    showLoading = false;
  }

  return {
    token: token,
    poems: poems,
    pages: pages,
    total: total,
    error: error,
    showLoading: showLoading
  };
};

export default connect(mapStateToProps)(Accept);
