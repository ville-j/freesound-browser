import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Auth, UserBar, AppLoading, Home } from "./Components";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://freesound.org/apiv2/me/")
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
      {loading && <AppLoading />}
      {!loading && (
        <>
          <UserBar user={user} />
          <Router>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
