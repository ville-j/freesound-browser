import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Preview } from "./";

const SampleName = styled.span`
  font-weight: 600;
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const SampleDuration = styled.span`
  display: inline-block;
  font-size: 0.9em;
  margin-right: 10px;
  font-weight: 300;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.8em;
  margin: 2px;
  background: #f1f1f1;
  padding: 2px 5px;
`;

const ImageContainer = styled.div`
  height: 100px;
  position: relative;
  display: inline-block;
  > img {
    height: 100%;
    filter: sepia(1) contrast(1.2) saturate(50) hue-rotate(280deg);
  }
`;

const SoundInfo = ({ data, link }) => (
  <>
    <Preview url={data.previews["preview-lq-mp3"]} />
    <SampleDuration>
      {Math.floor(data.duration / 60)}:
      {Math.ceil(data.duration % 60)
        .toString()
        .padStart(2, "0")}
    </SampleDuration>
    <SampleName>
      {link ? <Link to={`/s/${data.id}`}>{data.name}</Link> : data.name}
    </SampleName>
    <div>
      <ImageContainer>
        <img alt="Sound waveform" src={data.images.waveform_bw_m} />
      </ImageContainer>
    </div>
    <div>
      {data.tags.map((t, i) => (
        <Tag key={i}>{t}</Tag>
      ))}
    </div>
  </>
);

export default SoundInfo;
