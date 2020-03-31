import React, { useState, useEffect } from "react";
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
  position: relative;
  ${props =>
    props.isPlaying &&
    css`
      > div {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #b248de;
        animation: pulse 2s infinite;
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }
      }
    `}
`;

const Play = ({ url }) => {
  const [play, exposedData] = useSound(url);
  useEffect(() => {
    play();
    return function cleanup() {
      if (exposedData.isPlaying) {
        exposedData.stop();
      }
    };
  });
  return null;
};

const Preview = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <StyledPreview
      isPlaying={playing}
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      <div />
      <span aria-label="Play sound" role="img" style={{ position: "relative" }}>
        🎧
      </span>
      {playing && <Play url={url} />}
    </StyledPreview>
  );
};

export default Preview;
