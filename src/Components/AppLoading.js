import React from "react";
import styled from "styled-components";

import DataLoading from "./DataLoading";

const StyledAppLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppLoading = () => (
  <StyledAppLoading>
    <DataLoading text="Connecting to freesound.org" />
  </StyledAppLoading>
);

export default AppLoading;
