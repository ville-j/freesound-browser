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
  ${props =>
    props.isPlaying &&
    css`
      background: #b248de;
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
      <span aria-label="Play sound" role="img">
        🎧
      </span>
      {playing && <Play url={url} />}
    </StyledPreview>
  );
};

export default Preview;
