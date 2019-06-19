import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPoem } from "../../utils/api";
import Thumb from "./Thumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  image: "",
  fileName: "Carregar imagem",
  email: "",
  phone: "",
  website: "",
  title: "",
  author: "",
  text: ""
};

const validationSchema = Yup.object({
  image: Yup.mixed()
    .notRequired()
    .test("fileFormat", "Somente arquivos jpg e png sao suportados", value => {
      if (typeof value !== "undefined")
        return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
      return true;
    }),
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail obrigatório"),
  phone: Yup.string()
    .matches(
      /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/,
      "Formatos aceitos: (xx) xxxxx-xxxx ou (xx) xxxx-xxxx"
    )
    .required("O telefone é obrigatório"),
  title: Yup.string().required("O título é obrigatório"),
  author: Yup.string().required("O nome do autor é obrigatório"),
  text: Yup.string().required("O texto do poema é obrigatório")
});

class FormPoem extends React.Component {
  render() {
    return (
      <div className="form-wrapper">
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            let data = new FormData();
            data.append("image", values.image);
            data.append("email", values.email);
            data.append("phone", values.phone);
            data.append("website", values.website);
            data.append("title", values.title);
            data.append("author", values.author);
            data.append("text", values.text);

            createPoem(data).then(
              res => {
                if (res.status === 200) {
                  toast(
                    "Muito bom agora só aguardar, seu poema estará disponível na aba 'Mural' após ser avaliado 😎",
                    { position: "top-center" }
                  );
                }
              },
              err => {
                toast.error(
                  "Ops! 😰 algo errado aconteceu, tente novamente ou entre em contato com o administrador.",
                  { position: "top-center" }
                );
                console.log(err);
              }
            );
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="left-form">
                <div className="field">
                  <label className="poem-label" htmlFor="image">
                    IMAGEM
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
                  <label className="poem-label" htmlFor="email">
                    E-MAIL *
                  </label>
                  <Field
                    id="email"
                    className="input-field"
                    type="email"
                    name="email"
                    placeholder="E-mail para contato"
                  />
                  <ErrorMessage name="email">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="poem-label" htmlFor="phone">
                    TELEFONE *
                  </label>
                  <Field
                    id="phone"
                    className="input-field"
                    type="text"
                    name="phone"
                    placeholder="Telefone para contato"
                  />
                  <ErrorMessage name="phone">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="poem-label" htmlFor="website">
                    SITE
                  </label>
                  <Field
                    id="website"
                    className="input-field"
                    type="text"
                    name="website"
                    placeholder="Site para divulgação pessoal"
                  />
                </div>
                <Thumb image={values.image} />
              </div>
              <div className="right-form">
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
                  <label className="poem-label" htmlFor="author">
                    AUTOR *
                  </label>
                  <Field
                    id="author"
                    className="input-field"
                    type="text"
                    name="author"
                    placeholder="Autor"
                  />
                  <ErrorMessage name="author">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field">
                  <label className="text-label poem-label" htmlFor="text">
                    TEXTO *
                  </label>
                  <Field
                    id="text"
                    className="input-field textarea"
                    name="text"
                    component="textarea"
                    placeholder="Digite sua poesia aqui!"
                  />
                  <ErrorMessage name="text">
                    {msg => <div className="field-error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default FormPoem;
