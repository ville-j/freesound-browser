import React from "react";
import styled from "styled-components";

const StyledUserBar = styled.div`
  border-bottom: 1px solid #d8d8d8;
  position: fixed;
  width: 100%;
  background: #fff;
  height: 60px;
  box-sizing: border-box;
  color: #ca2497;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-weight: 600;
  z-index: 100;

  a {
    color: #ca2497;
    text-decoration: none;
  }
`;

const UserBar = ({ user }) => (
  <StyledUserBar>
    {user ? (
      `Logged in as ${user.username}`
    ) : (
      <a
        href={`https://freesound.org/apiv2/oauth2/authorize/?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code`}
      >
        login
      </a>
    )}
  </StyledUserBar>
);

export default UserBar;
