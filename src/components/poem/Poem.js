import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./poem.scss";
import { createPoem } from "../../utils/api";
import Loader from "react-loader-spinner";

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

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.image) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.image);
    });
  }

  render() {
    const { image } = this.props;
    const { loading, thumb } = this.state;

    if (!image) {
      return null;
    }

    if (loading) {
      return (
        <div className="loader">
          <Loader type="Oval" color="#f1f1f1" height={30} width={30} />
        </div>
      );
    }

    return (
      <div className="img-thumb-wrapper">
        <img src={thumb} alt={image.name} className="img-thumbnail" />
      </div>
    );
  }
}

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
        <div className="form-wrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              image: Yup.mixed()
                .notRequired()
                .test(
                  "fileFormat",
                  "Somente arquivos jpg e png sao suportados",
                  value => {
                    return ["image/jpg", "image/jpeg", "image/png"].includes(
                      value.type
                    );
                  }
                ),
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
            })}
            onSubmit={values => {
              // react sweat alert or awesome alert
              // to inform the user that his poem will be uploaded
              let data = new FormData();

              data.append("image", values.image);
              data.append("email", values.email);
              data.append("phone", values.phone);
              data.append("website", values.website);
              data.append("title", values.title);
              data.append("author", values.author);
              data.append("text", values.text);
              createPoem(data).then(
                result => {
                  console.log(result);
                },
                err => {
                  console.log(err);
                }
              );

              console.log(
                JSON.stringify(
                  {
                    values,
                    file: values.image,
                    type: values.image.type,
                    size: `${values.image.size} bytes`
                  },
                  null,
                  2
                )
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
                  <button
                    className="submit-btn"
                    type="submit"
                    //disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
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
