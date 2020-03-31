import React from "react";
import styled from "styled-components";

const StyledUserBar = styled.div`
  background: #8a1fb7;
  color: #fff;
  padding: 15px;
  text-align: right;
  font-weight: 600;

  a {
    color: #fff;
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
