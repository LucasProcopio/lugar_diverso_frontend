import React from "react";

export const Error = props => {
  return (
      <div className="error-wrapper">
        <div className="error">{props.message}</div>
      </div>
  );
};
