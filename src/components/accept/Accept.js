import React from "react";
import { fetchNotAccepted, deletePoem, acceptPoem } from "../wall/wallAction";
import { verifyAuth } from "../../utils/helpers";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "../wall/wall.scss";
import { confirmAlert } from "react-confirm-alert";
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

  render() {
    const pageItems = [];
    if (this.props.pages !== "undefined") {
      for (let i = 1; i <= this.props.pages; i++) {
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

    return (
      <div className="container wall-container">
        <div className="content">
          <div className="poems-wrapper">
            {this.props.showLoading === true ? (
              <div className="wall-loader">
                <Loader type="Grid" color="#f1f1f1" height={100} width={100} />
              </div>
            ) : (
              this.props.poems.map((poem, index) => (
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
              ))
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
  console.log("RESULTS", state.wallReducer.results);
  console.log("WALL RED", state.wallReducer);
  return {
    token: state.loginReducer.token,
    poems: state.wallReducer.results,
    pages: state.wallReducer.pages,
    total: state.wallReducer.count,
    showLoading: typeof state.wallReducer.results === "undefined" ? true : false
  };
};

export default connect(mapStateToProps)(Accept);
