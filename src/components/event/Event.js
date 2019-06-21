import React from "react";
import { connect } from "react-redux";
import { fetchEvents } from "./eventAction";
import Loader from "react-loader-spinner";
import "./event.scss";

class Event extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchEvents(1));
  }

  render() {
    const pageItems = [];
    if (this.props.pages !== "undefined") {
      for (let i = 1; i <= this.props.pages; i++) {
        pageItems.push(
          <span
            key={i}
            className="page-item"
            onClick={() => this.props.dispatch(fetchEvents(i))}
          >
            {i}
          </span>
        );
      }
    }

    return (
      <div className="container event-container">
        <div className="event-wrapper">
          {this.props.showLoading === true ? (
            <div className="event-loading">
              <Loader type="Grid" color="#f1f1f1" height={70} width={70} />
            </div>
          ) : (
            this.props.events.map(event => {
              return (
                <div className="event" key={event.id}>
                  <div className="event-image">
                    <img src="/images/home/home-1.jpeg" alt={event.title} />
                  </div>
                  <div className="event-content">
                    <div className="event-title">
                      <span>Evento: </span>
                      {event.title}
                    </div>
                    <div className="event-info">
                      <ul className="event-list-info">
                        <li>
                          <span>Data:</span> {event.date}
                        </li>
                        <li>
                          <span>Local:</span>
                          {event.location}
                        </li>
                        <li>
                          <span>Hora:</span>
                          {event.date} HORA
                        </li>
                        <li>
                          <span>Sobre o evento:</span>
                          {event.about}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="event-paging">
          <div className="paging">{pageItems.map(item => item)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventReducer.events,
    total: state.eventReducer.count,
    pages: state.eventReducer.pages,
    showLoading: typeof state.eventReducer.events !== "undefined" ? false : true
  };
};

export default connect(mapStateToProps)(Event);
