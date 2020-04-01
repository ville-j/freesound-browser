import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { Preview } from "./";

const StyledHome = styled.div``;

const SearchInput = styled.input`
  display: block;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: 0;
  background: #f9f9f9;
  font-family: inherit;
  font-size: 1em;
  position: fixed;
  z-index: 100;
`;

const SearchResults = styled.div`
  padding-top: 50px;
`;

const SearchResult = styled.div`
  padding: 15px;
  border-bottom: 1px solid #d8d8d8;
`;

const SampleName = styled.span`
  font-weight: 600;
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

let t;

const Home = () => {
  const [results, setResults] = useState([]);
  return (
    <StyledHome>
      <SearchInput
        placeholder="Search"
        onChange={e => {
          clearTimeout(t);
          const val = e.target.value;
          if (val) {
            t = setTimeout(async () => {
              try {
                const { data } = await axios.get(
                  "https://freesound.org/apiv2/search/text/",
                  {
                    params: {
                      query: val,
                      fields: "name,previews,tags,id,images,duration"
                    }
                  }
                );

                setResults(data.results);
              } catch (err) {
                console.log(err);
              }
            }, 500);
          } else {
            setResults([]);
          }
        }}
      />
      <SearchResults>
        {results.map(r => (
          <SearchResult key={r.id}>
            <Preview url={r.previews["preview-lq-mp3"]} />
            <SampleName>
              <SampleDuration>
                {Math.floor(r.duration / 60)}:
                {Math.ceil(r.duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </SampleDuration>
              {r.name}
            </SampleName>
            <img
              alt="Sound waveform"
              src={r.images.waveform_bw_m}
              style={{
                height: 100,
                display: "block",
                filter:
                  "sepia(1) saturate(500%) contrast(300%) hue-rotate(330deg)"
              }}
            />
            <div>
              {r.tags.map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </div>
          </SearchResult>
        ))}
      </SearchResults>
    </StyledHome>
  );
};

export default Home;
