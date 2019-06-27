import React from "react";
import { connect } from "react-redux";
import { fetchAcceptedPoems } from "./wallAction";
import Loader from "react-loader-spinner";
import { Error } from "../error/Error";
import "./wall.scss";

class Wall extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAcceptedPoems(1));
  }

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
            onClick={() => this.props.dispatch(fetchAcceptedPoems(i))}
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
          </div>
        ));
      }
    } else if (typeof error !== "undefined") {
      poemData = <Error message={error} />;
    }

    return (
      <div className="container wall-container">
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

  let showLoading = true;

  if (typeof error !== "undefined") {
    showLoading = false;
  }

  if (typeof poems !== "undefined") {
    showLoading = false;
  }

  return {
    poems: poems,
    pages: pages,
    total: total,
    error: error,
    showLoading: showLoading
  };
};

export default connect(mapStateToProps)(Wall);
