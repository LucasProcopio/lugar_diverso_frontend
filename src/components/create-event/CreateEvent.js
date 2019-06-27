import React from "react";
import { connect } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { createEvent } from "../../utils/api";
import { verifyAuth } from "../../utils/helpers";
import { MdReply } from "react-icons/md";

import * as Yup from "yup";
import "./createEvent.scss";

const initialValues = {
  image: "",
  title: "",
  about: "",
  date: "",
  time: "",
  location: "",
  fileName: "Carregar imagem"
};

const validationSchema = Yup.object({
  image: Yup.mixed()
    .required("Imagem obrigatória")
    .test("fileFormat", "Somente arquivos jpg e png sao suportados", value => {
      if (typeof value !== "undefined")
        return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
      return true;
    }),
  title: Yup.string().required("O título é obrigatório"),
  about: Yup.string().required("O campo sobre é obrigatório"),
  time: Yup.string()
    .required("O Horário do evento é obrigatório")
    .matches(
      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      "O horário deve ter o formato 00:00"
    ),
  date: Yup.string()
    .required("A data do evento é obrigatória")
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      "A data deve ter o seguinte formato 11/11/1111"
    ),
  location: Yup.string().required("O local do evento é obrigatório")
});

class CreateEvent extends React.Component {
  componentDidMount() {
    verifyAuth(this.props);
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="container create-event-container">
        <div className="go-back" onClick={() => this.handleBack()}>
          <MdReply size={26} color="#f1f1f1" className="go-back-icon" />
        </div>
        <div className="form-wrapper-event">
          <ToastContainer />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
              let data = new FormData();
              data.append("image", values.image);
              data.append("title", values.title);
              data.append("about", values.about);
              data.append("date", values.date);
              data.append("time", values.time);
              data.append("location", values.location);

              createEvent(data).then(
                res => {
                  if (res.status === 200) {
                    toast("Evento publicado com sucesso 😎", {
                      position: "top-center"
                    });
                  }
                },
                err => {
                  toast.error(
                    "Ops! 😰 algo errado aconteceu, tente novamente mais tarde.",
                    { position: "top-center" }
                  );
                  console.log(err);
                }
              );
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="field">
                  <label className="poem-label" htmlFor="image">
                    IMAGEM *
                  </label>
                  <label htmlFor="image" className="input-file">
                    {values.fileName}
                  </label>
                  <input
                    id="image"
                    className="input-field file"
                    name="image"
                    type="file"
                    onChange={event => {
                      setFieldValue("image", event.currentTarget.files[0]);
                      setFieldValue(
                        "fileName",
                        event.currentTarget.files.length > 0
                          ? event.currentTarget.files[0].name
                          : "Carregar imagem"
                      );
                    }}
                  />
                  <ErrorMessage name="image">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="poem-label" htmlFor="location">
                    LOCAL *
                  </label>
                  <Field
                    id="location"
                    className="input-field"
                    type="text"
                    name="location"
                    placeholder="Local do evento"
                  />
                  <ErrorMessage name="location">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="poem-label" htmlFor="date">
                    DATA *
                  </label>
                  <Field
                    id="date"
                    className="input-field"
                    type="text"
                    name="date"
                    placeholder="Data do evento ex: 11/11/1111"
                  />
                  <ErrorMessage name="date">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="poem-label" htmlFor="time">
                    HORA *
                  </label>
                  <Field
                    id="time"
                    className="input-field"
                    type="text"
                    name="time"
                    placeholder="Horário do evento ex: 00:00"
                  />
                  <ErrorMessage name="time">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="poem-label" htmlFor="title">
                    TITULO *
                  </label>
                  <Field
                    id="title"
                    className="input-field"
                    type="text"
                    name="title"
                    placeholder="Título"
                  />
                  <ErrorMessage name="title">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="text-label poem-label" htmlFor="about">
                    SOBRE *
                  </label>
                  <Field
                    id="about"
                    className="input-field textarea"
                    name="about"
                    component="textarea"
                    placeholder="Sobre o evento"
                  />
                  <ErrorMessage name="about">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <button className="submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = state => {
  return {
    token: state.loginReducer.token
  };
};

export default connect(mapsStateToProps)(CreateEvent);
