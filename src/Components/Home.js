import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { SoundInfo, DataLoading } from "./";

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

const CancelToken = axios.CancelToken;
let t;
let cancel;

const search = val => {
  if (cancel) {
    cancel();
  }
  if (!val) return Promise.reject();
  return axios.get(`${process.env.REACT_APP_API_URL}/search`, {
    params: {
      query: val,
      fields: "name,previews,tags,id,images,duration"
    },
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
};

const Home = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <StyledHome>
      <SearchInput
        placeholder="Search"
        onChange={e => {
          clearTimeout(t);
          const val = e.target.value;
          t = setTimeout(() => {
            setResults(null);
            setQuery(val);
            search(val)
              .then(({ data }) => {
                setResults(data.results);
              })
              .catch(() => {
                setResults([]);
              });
          }, 700);
        }}
      />
      <SearchResults>
        {results &&
          results.map(r => (
            <SearchResult key={r.id}>
              <SoundInfo data={r} link />
            </SearchResult>
          ))}
        {!results && <DataLoading text={`Searching for "${query}"`} />}
      </SearchResults>
    </StyledHome>
  );
};

export default Home;
