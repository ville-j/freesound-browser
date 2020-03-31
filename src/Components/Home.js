import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { Preview } from "./";

const StyledHome = styled.div`
  padding: 15px;
`;

const SearchInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 0;
  background: #f1f1f1;
  font-family: inherit;
`;

const SearchResult = styled.div`
  margin: 10px 0;
`;

let t;

const Home = () => {
  const [results, setResults] = useState([]);
  return (
    <StyledHome>
      <SearchInput
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
                      fields: "name,previews,tags,id"
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
      {results.map(r => (
        <SearchResult key={r.id}>
          <Preview url={r.previews["preview-lq-mp3"]} />
          {r.name}
        </SearchResult>
      ))}
    </StyledHome>
  );
};

export default Home;
