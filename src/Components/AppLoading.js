import React from "react";
import styled from "styled-components";

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
  text-transform: uppercase;
  font-weight: 800;
  color: #ca2497;
  font-size: 2em;
`;

const AppLoading = () => <StyledAppLoading>Loading</StyledAppLoading>;

export default AppLoading;
