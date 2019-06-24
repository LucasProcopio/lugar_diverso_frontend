import React from "react";
import { connect } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import "./createEvent.scss";

const initialValues = {
  image: "",
  title: "",
  about: "",
  date: "",
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
  time: Yup.string().required("O Horário do evento é obrigatório"),
  date: Yup.string().required("A data do evento é obrigatória"),
  location: Yup.string().required("O local do evento é obrigatório")
});

class CreateEvent extends React.Component {
  render() {
    return (
      <div className="container create-event-container">
        <div className="form-wrapper-event">
          <ToastContainer />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}
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
                    placeholder="Data do evento ex: 11-11-1111"
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
                    placeholder="Horário do evento ex: 00:00:00"
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

export default connect()(CreateEvent);
