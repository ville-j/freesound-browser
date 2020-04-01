import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { SoundInfo } from "./";

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
                  `${process.env.REACT_APP_API_URL}/search`,
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
            <SoundInfo data={r} link />
          </SearchResult>
        ))}
      </SearchResults>
    </StyledHome>
  );
};

export default Home;
