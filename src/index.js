import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import qs from "query-string";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { load, save } from "./storage";

const { access_token, refresh_token } = qs.parse(window.location.search);

if (access_token && refresh_token) {
  save("access_token", access_token);
  save("refresh_token", refresh_token);
  window.history.replaceState(
    {},
    "",
    window.location.origin + window.location.pathname
  );
}

const saved_access_token = load("access_token");

if (saved_access_token) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${saved_access_token}`;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
