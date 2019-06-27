import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { updateAdmApi } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { verifyAuth } from "../../utils/helpers";
import { MdReply } from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";
import "./profile.scss";

const initialValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Senha obrigatória")
    .test(
      "password",
      "A senha deve conter no pelomenos 6 caracteres",
      value => {
        if (typeof value !== "undefined") {
          return value.length > 5;
        }
      }
    ),
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail obrigatório")
});

class Profile extends React.Component {
  componentDidMount() {
    verifyAuth(this.props);
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { email, uuid, token } = this.props.data;

    return (
      <div className="container">
        <div className="go-back" onClick={() => this.handleBack()}>
          <MdReply size={26} color="#f1f1f1" className="go-back-icon" />
        </div>
        <div className="profile">
          <ToastContainer />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
              const data = {
                token: token,
                uuid: uuid,
                email: values.email,
                password: values.password
              };
              updateAdmApi(data)
                .then(res => {
                  toast(
                    "Muito bom suas informações de login foram atualizadas 😎",
                    { position: "top-center" }
                  );
                })
                .catch(err => {
                  toast.error(
                    "Ops! 😰 algo errado aconteceu, tente novamente ou entre em contato com o administrador.",
                    { position: "top-center" }
                  );
                  console.log(err);
                });
            }}
          >
            {() => (
              <div className="form-profile">
                <Form>
                  <div className="field">
                    <label htmlFor="email">E-MAIL</label>
                    <Field
                      id="email"
                      className="profile-input"
                      type="email"
                      name="email"
                      placeholder={email}
                    />
                    <ErrorMessage name="email">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="field">
                    <label htmlFor="password">SENHA</label>
                    <Field
                      id="password"
                      className="profile-input"
                      type="password"
                      name="password"
                      placeholder="Digite sua senha aqui"
                    />
                    <ErrorMessage name="password">
                      {msg => <div className="field-error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <button className="submit-profile" type="submit">
                    Submit
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.loginReducer,
    token: state.loginReducer.token
  };
};
export default connect(mapStateToProps)(Profile);
