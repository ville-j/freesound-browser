import React, { useState, useMemo, useEffect } from "react";
import styled, { css } from "styled-components";
import { Howl } from "howler";

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
        background: #1aceac;
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

const Preview = ({ url }) => {
  const [playing, setPlaying] = useState(false);

  const sound = useMemo(() => {
    return new Howl({
      src: [url],
      html5: true,
      preload: false,
      onend: () => {
        setPlaying(false);
      }
    });
  }, [url]);

  useEffect(
    () => () => {
      sound.stop();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClick = () => {
    if (sound.playing()) {
      sound.pause();
      setPlaying(false);
    } else {
      sound.play();
      setPlaying(true);
    }
  };

  return (
    <StyledPreview
      role="button"
      tabIndex="0"
      isPlaying={playing}
      onClick={handleClick}
      onKeyPress={e => {
        e.which === 13 && handleClick();
      }}
    >
      <div />
      <span aria-label="Play sound" role="img" style={{ position: "relative" }}>
        🎧
      </span>
    </StyledPreview>
  );
};

export default Preview;
