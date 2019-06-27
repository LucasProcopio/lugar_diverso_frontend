import { checkAuth } from "./api";

export function isEmpty(input) {
  if (Array.isArray(input)) {
    return input.length === 0;
  }

  return !input || Object.keys(input).length === 0;
}

export function verifyAuth(props) {
  const { token } = props;
  if (typeof token !== "undefined") {
    checkAuth(token).catch(err => {
      if (typeof err.response === "undefined") {
        alert(err);
        props.history.push("/login");
      } else if (typeof err.response.data !== "undefined") {
        props.history.push({
          pathname: "/login",
          state: { errors: err.response.data }
        });
      }
    });
  } else {
    props.history.push({
      pathname: "/login",
      state: { errors: "Sessão expirada por favor logue novamente." }
    });
  }
}
