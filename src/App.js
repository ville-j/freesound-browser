import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { UserBar, AppLoading, Home, SoundBar } from "./Components";
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
              <Route path="/" component={Home} />
              <Route path="/s/:id" component={SoundBar} />
            </Router>
          </View>
        </>
      )}
    </div>
  );
}

export default App;
