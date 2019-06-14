import React from "react";
import "./home.scss";

class Home extends React.Component {
  componentDidMount() {
    // fetch history, contact and how to join
  }
  render() {
    return (
      <div className="container">
        <div className="history">
          <div className="history-content">
            <h2>HISTÓRIA</h2>
            <p className="history-desc">
              Lorem ipsum dolor sit amet consectetu adipisicing elit. Facilis
              molestias possimus incidunt quis inventore voluptatem vel maiores
              voluptates, saepe explicabo est nihil aut excepturi, numquam
              veniam vitae qui molestiae. Deleniti.
            </p>
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
            <p className="join-desc">
              Lorem ipsum dolor sit amet consectetu adipisicing elit. Facilis
              molestias possimus incidunt quis inventore voluptatem vel maiores
              voluptates, saepe explicabo
            </p>
          </div>
          <div className="home-contact">
            <h2>CONTATO</h2>
            <p className="contact-info">(XX) XXXX-XXXX hdusahdha@mail.com</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
