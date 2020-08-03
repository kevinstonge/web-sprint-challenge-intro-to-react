import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Character from "./components/Character";
import axios from "axios";

const Header = styled.h1`
  text-align: center;
  padding: 0.5rem;
  color: var(--em1);
  font-size: 2.5rem;
  font-weight: bolder;
  text-shadow: 0.2rem 0.2rem 0.3rem black;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: baseline;
  align-content: center;
  width: 100%;
  margin-bottom: 4rem;
  @media (max-width: 600px) {
    margin-bottom: 7rem;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  @media (max-width: 600px) {
    flex-direction: column;
    min-width: 300px;
    height: 6rem;
  }
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 1rem;
  bottom: 0;
  margin: auto;
  width: 100%;
  position: fixed;
  background: var(--bg2);
  nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    button {
      margin: 0.2rem;
      padding: 0.5rem 1rem;
      background-color: rgba(0, 0, 0, 0);
      color: var(--fg1);
      border: 0;
      &.enabled {
        background-color: var(--bg2);
        color: var(--fg3);
        &:hover {
          background-color: var(--bg3);
          cursor: pointer;
        }
      }
    }
  }
`;

const H3Info = styled.h3`
  text-align: center;
  color: var(--em1);
  font-weight: bold;
  font-size: 1.5rem;
`;

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(9);
  //ten per page, count = 82, 9 pages total math.ceil(count) = number of pages
  //page 1 has previous: null, page 9 has next: null
  //each page returns { results: [ { character data }]}
  const [characters, setCharacters] = useState({
    results: null,
  });
  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/?page=${page}`)
      .then((r) => {
        setCharacters(r.data);
        setPages(Math.ceil(r.data.count / 10));
      })
      .catch((e) =>
        console.log(
          setCharacters({
            results: [{ name: "error!", description: "something went wrong" }],
          })
        )
      );
  }, [page]);
  return (
    <div className="App">
      <Header>Star Wars Characters</Header>
      {characters.results == null ? (
        <H3Info>Loading</H3Info>
      ) : (
        <CardsContainer>
          {characters.results.map((c) => {
            return <Character data={c} key={c.name} />;
          })}
        </CardsContainer>
      )}
      <Footer>
        <H3Info>go to page:</H3Info>
        <nav>
          {new Array(pages).fill(0).map((p, i) => {
            return i + 1 === page ? (
              <button key={`navToPage${i + 1}`} className="disabled" disabled>
                {i + 1}
              </button>
            ) : (
              <button
                key={`navToPage${i + 1}`}
                onClick={() => setPage(i + 1)}
                className="enabled"
              >
                {i + 1}
              </button>
            );
          })}
        </nav>
      </Footer>
    </div>
  );
};

export default App;
