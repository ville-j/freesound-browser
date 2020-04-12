import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

import { UserBar, Home, SoundBar } from "./Components";
import "./App.css";

const View = styled.div`
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
`;

function App({ user }) {
  return (
    <div className="App">
      <UserBar user={user} />
      <View>
        <Router basename="/sounds">
          <Route path="/" component={Home} />
          <Route path="/s/:id" component={SoundBar} />
        </Router>
      </View>
    </div>
  );
}

export default App;
