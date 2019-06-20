import React from "react";
import { connect } from "react-redux";
import { fetchAcceptedPoems } from "./wallAction";
import Loader from "react-loader-spinner";
import "./wall.scss";

class Wall extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAcceptedPoems(1));
  }

  render() {
    const pageItems = [];
    if (this.props.pages !== "undefined") {
      for (let i = 1; i <= this.props.pages; i++) {
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

    return (
      <div className="container wall-container">
        <div className="content">
          <div className="poems-wrapper">
            {this.props.showLoading === true ? (
              <div className="wall-loader">
                <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
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
                    <p className="author">{poem.author}</p>
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
  return {
    poems: state.wallReducer.results,
    pages: state.wallReducer.pages,
    total: state.wallReducer.count,
    showLoading: typeof state.wallReducer.results === "undefined" ? true : false
  };
};

export default connect(mapStateToProps)(Wall);
