import qs from "query-string";
import axios from "axios";
import { save } from "../storage";

const Auth = ({ location, history }) => {
  const { access_token, refresh_token } = qs.parse(location.search);
  save("access_token", access_token);
  save("refresh_token", refresh_token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  history.push("/");
  return null;
};

export default Auth;
