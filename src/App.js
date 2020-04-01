import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { Auth, UserBar, AppLoading, Home } from "./Components";
import "./App.css";

const View = styled.div`
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
`;
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          <View>
            <Router basename="/sounds">
              <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" component={Home} />
              </Switch>
            </Router>
          </View>
        </>
      )}
    </div>
  );
}

export default App;
