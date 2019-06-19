import React from "react";
import "./poem.scss";
import FormPoem from "./FormPoem";

class Poem extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="selection-wrapper">
          <div className="selection-content">
            <h2>A SELEÇÃO</h2>
            <p className="selection-body">
              Aqui você pode nos enviar sua poesia para publicação no mural do
              nosso site. Fazemos a análise e depois você pode conferir ela
              publicada! Preencha os campos a seguir:
            </p>
          </div>
        </div>
        <FormPoem />
        <div className="poem-image">
          <img
            src="/images/poem/escreva-sua-poesia.jpeg"
            alt="Escreva sua poesia"
          />
        </div>
      </div>
    );
  }
}

export default Poem;
