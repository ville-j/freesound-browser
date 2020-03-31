import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import useSound from "use-sound";

const StyledPreview = styled.span`
  display: inline-block;
  border-radius: 50%;
  background: #efefef;
  color: #fff;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  ${props =>
    props.isPlaying &&
    css`
      background: #b248de;
    `}
`;

const Preview = ({ url }) => {
  const [play, exposedData] = useSound(url);

  useEffect(() => {
    return function cleanup() {
      if (exposedData.isPlaying) {
        exposedData.stop();
      }
    };
  });
  return (
    <StyledPreview
      isPlaying={exposedData.isPlaying}
      onClick={() => {
        if (exposedData.isPlaying) {
          exposedData.stop();
        } else {
          play();
        }
      }}
    >
      <span aria-label="Play sound" role="img">
        🎧
      </span>
    </StyledPreview>
  );
};

export default Preview;
