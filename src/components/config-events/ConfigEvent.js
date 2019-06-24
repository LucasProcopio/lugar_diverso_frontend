import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { confirmAlert } from "react-confirm-alert";
import { verifyAuth } from "../../utils/helpers";
import { deleteEvent, fetchEvents } from "../event/eventAction";
import { MdReply } from "react-icons/md";

import "./config-event.scss";
import "react-confirm-alert/src/react-confirm-alert.css";

class ConfigEvent extends React.Component {
  componentDidMount() {
    verifyAuth(this.props);
    this.props.dispatch(fetchEvents(1));
  }

  handleDelete = id => {
    confirmAlert({
      title: "Quer mesmo deletar ?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Sim",
          onClick: () => this.props.dispatch(deleteEvent(id))
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
        <div className="go-back" onClick={() => this.handleBack()}>
          <MdReply size={26} color="#f1f1f1" className="go-back-icon" />
        </div>
        <div className="event-wrapper">
          {this.props.showLoading === true ? (
            <div className="event-loading">
              <Loader type="Grid" color="#f1f1f1" height={100} width={100} />
            </div>
          ) : (
            this.props.events.map(event => {
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
                    <div className="event-action">
                      <button
                        className="delete-event-btn"
                        onClick={() => this.handleDelete(event.id)}
                      >
                        Deletar
                      </button>
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
    token: state.loginReducer.token,
    events: state.eventReducer.events,
    total: state.eventReducer.count,
    pages: state.eventReducer.pages,
    showLoading: typeof state.eventReducer.events !== "undefined" ? false : true
  };
};

export default connect(mapStateToProps)(ConfigEvent);
