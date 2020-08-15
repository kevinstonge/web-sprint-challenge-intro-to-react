// Write your Character component here
import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import CharacterDetail from "./CharacterDetail";

const cardKeyFrames = keyframes`
0% { transform: scale(0,0);}
100% {transform: scale(1,1);}
`;

const Card = styled.div`
  animation ${cardKeyFrames} 0.5s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: var(--em1);
  padding: 0;
  margin-top: 1rem;
  &:nth-child(1) {
    margin-top: 0;
  }
  box-shadow: 0.3rem 0.3rem 0.5rem 0 var(--bg2);
  border-radius: 0.3rem 0.3rem 0 0;
  border-left: 0.1rem solid var(--fg1);
  width: calc(100% - 2rem);
  @media (min-width: 600px) {
    width: calc(50% - 3rem);
  }
  @media (min-width: 900px) {
    width: calc(33% - 3rem);
  }
  @media (min-width: 1200px) {
    width: calc(26% - 3rem);
  }
`;
const CardHeader = styled.div`
  background-color: var(--bg2);
  color: var(--fg2);
  margin: 0;
  padding: 0.2rem;
  width: 100%;
  text-align: center;
  font-weight: bold;
  border-radius: 0.3rem 0.3rem 0 0;
`;

const CardInfo = styled.div`
  background-color: var(--bg2);
  color: var(--fg2);
  margin: 0;
  width: calc(100% - 0.9rem);
  margin: 0.2rem 0 0.2rem 0.4rem;
  border-radius: 0 0.3rem 0.3rem 0;
  p {
    border-left: 1px solid var(--fg1);
    border-top: 1px solid var(--fg1);
    border-radius: 0 0.3rem 0.3rem 0;
    padding: 0.2rem;
  }
  box-shadow: 0.1rem 0.1rem 0.1rem 0 var(--bg2);
`;

const Character = (props) => {
  return (
    <Card>
      <CardHeader>
        <h3>{props.data.name}</h3>
      </CardHeader>
      {Object.keys(props.data).map((key) => {
        if (
          key !== "name" &&
          key !== "created" &&
          key !== "edited" &&
          key !== "url" &&
          typeof props.data[key] === "string" &&
          !props.data[key].includes("http://swapi.dev/api")
        ) {
          return (
            <CardInfo key={`${props.data.name}-${key}-info`}>
              <p>
                {key}: {props.data[key]}
              </p>
            </CardInfo>
          );
        } else if (
          key !== "url" &&
          props.data[key].includes("http://swapi.dev/api")
        ) {
          return (
            <CardInfo key={`${props.data.name}-${key}-info`}>
              <p>
                {key}: <CharacterDetail call={props.data[key]} />
              </p>
            </CardInfo>
          );
        } else if (typeof props.data[key] === "object") {
          return (
            <CardInfo key={`${props.data.name}-${key}-info`}>
              <p>
                {key}:{" "}
                {props.data[key].length > 0 ? (
                  props.data[key].map((d, i) => {
                    const comma = i === props.data[key].length - 1 ? "" : ", ";
                    return (
                      <Fragment key={`${d}-info-${i}`}>
                        <CharacterDetail call={d} />
                        {comma}{" "}
                      </Fragment>
                    );
                  })
                ) : (
                  <Fragment key={`${key}-info`}>n/a</Fragment>
                )}
              </p>
            </CardInfo>
          );
        } else {
          return null;
        }
      })}
    </Card>
  );
};

export default Character;
