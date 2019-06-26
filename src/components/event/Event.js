import React from "react";
import { connect } from "react-redux";
import { fetchEvents } from "./eventAction";
import Loader from "react-loader-spinner";
import "./event.scss";
import { Error } from "../error/Error";

class Event extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchEvents(1));
  }

  render() {
    const { error, showLoading, pages, events } = this.props;
    const pageItems = [];
    let eventData;

    if (pages !== "undefined") {
      for (let i = 1; i <= pages; i++) {
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

    if (!showLoading && typeof error === "undefined") {
      if (events.length === 0) {
        eventData = (
          <Error message="Ainda não foi cadastrado nenhum evento 😔" />
        );
      } else {
        eventData = events.map(event => {
          return (
            <div className="event" key={event.id}>
              <div className="event-image">
                <img src={event.image} alt={event.title} />
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
                      <span>Horário:</span>
                      {event.time}
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
        });
      }
    } else if (error !== "undefined") {
      eventData = <Error message={error} />;
    }

    return (
      <div className="container event-container">
        <div className="event-wrapper">
          {showLoading === true ? (
            <div className="event-loading">
              <Loader type="Grid" color="#f1f1f1" height={100} width={100} />
            </div>
          ) : (
            eventData
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
  const events = state.eventReducer.events;
  const total = state.eventReducer.count;
  const pages = state.eventReducer.pages;
  const error = state.eventReducer.error;
  let showLoading = true;

  if (typeof error !== "undefined") {
    showLoading = false;
  }

  if (typeof events !== "undefined") {
    showLoading = false;
  }

  return {
    events: events,
    total: total,
    pages: pages,
    error: error,
    showLoading: showLoading
  };
};

export default connect(mapStateToProps)(Event);
