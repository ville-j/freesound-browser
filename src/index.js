import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import qs from "query-string";

import "./index.css";
import App from "./App";
import { AppLoading } from "./Components";
import * as serviceWorker from "./serviceWorker";
import { load, save, clear } from "./storage";

const { access_token, refresh_token } = qs.parse(window.location.search);
const refreshAxios = axios.create();

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
const saved_refresh_token = load("refresh_token");
/*
if (saved_access_token) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${saved_access_token}`;
}
*/
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async error => {
    if (error && error.response && error.response.status === 401) {
      return refreshAxios
        .get(`${process.env.REACT_APP_API_URL}/refresh`, {
          params: {
            refresh_token: saved_refresh_token
          }
        })
        .then(({ data }) => {
          save("access_token", data.access_token);
          save("refresh_token", data.refresh_token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.access_token}`;
          error.response.config.headers[
            "Authorization"
          ] = `Bearer ${data.access_token}`;
          return axios.request(error.response.config);
        })
        .catch(err => {
          clear("access_token");
          clear("refresh_token");
          console.log(err);
        });
    } else {
      return Promise.reject(error);
    }
  }
);

axios
  .get("https://freesound.org/apiv2/me/", {
    headers: {
      Authorization: `Bearer ${saved_access_token}`
    }
  })
  .then(({ data }) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${saved_access_token}`;
    initApp(data);
  })
  .catch(() => {
    initApp();
  });

ReactDOM.render(
  <React.StrictMode>
    <AppLoading />
  </React.StrictMode>,
  document.getElementById("root")
);

const initApp = data => {
  ReactDOM.render(
    <React.StrictMode>
      <App user={data} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
