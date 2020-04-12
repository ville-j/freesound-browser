import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { SoundInfo, DataLoading } from "./";

const StyledSoundBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  max-width: 100%;
  height: 100%;
  z-index: 101;
  border-left: 1px solid #d8d8d8;
  background: #fff;
`;

const Header = styled.div`
  background: #1aceac;
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-weight: 500;
`;

const Title = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 15px;
`;

const Close = styled.div`
  flex: 0 1 20px;
  font-size: 2em;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Content = styled.div`
  height: 100%;
  box-sizing: border-box;
  margin-top: -60px;
  padding-top: 60px;
`;

const Pad = styled.div`
  padding: 15px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

const Description = styled.p`
  white-space: pre-line;
`;

const DataTable = styled.div`
  display: table;
  font-size: 0.85em;
  line-height: 1.8em;
  font-weight: 300;
  > div {
    display: table-row;
    > div {
      :first-child {
        font-weight: 400;
        padding-right: 15px;
      }
      display: table-cell;
    }
  }
`;

const displayValues = [
  "geotag",
  "created",
  "license",
  "type",
  "channels",
  "filesize",
  "bitrate",
  "bitdepth",
  "samplerate",
  "num_downloads",
  "avg_rating",
  "num_ratings",
  "num_comments"
];

const SoundBar = ({
  match: {
    params: { id }
  }
}) => {
  const [soundData, setSoundData] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setSoundData(null);
    axios
      .get(`${process.env.REACT_APP_API_URL}/sounds/${id}`, {
        cancelToken: source.token
      })
      .then(({ data }) => {
        setSoundData(data);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      source.cancel();
    };
  }, [id]);
  return (
    <StyledSoundBar>
      <Header>
        <Title>{soundData ? soundData.name : id}</Title>
        <Close>
          <Link to="/">×</Link>
        </Close>
      </Header>
      <Content>
        {soundData && (
          <Pad>
            <SoundInfo data={soundData} />
            <Description>{soundData.description}</Description>
            <DataTable>
              {displayValues.map(k => (
                <div key={k}>
                  <div>{k}</div>
                  <div>{soundData[k]}</div>
                </div>
              ))}
            </DataTable>
          </Pad>
        )}
        {!soundData && <DataLoading text={`Loading sound ${id}`} />}
      </Content>
    </StyledSoundBar>
  );
};

export default SoundBar;
