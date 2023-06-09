import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Routes } from "../constants";
import { TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { searchRoads } from "../store/actions/creators";
import { roadsSelector } from "../store/selectors/roads";
import { Header, RoadCard } from "../components";
import "../App.css";
import styled from "styled-components";
import osm from "../constants/osm-providers";
import { useRef } from "react";
import { Questionnaire } from "../components/Questionnaire";

const WeightedRatingPage = (props) => {
  const [weights, setWeights] = useState({});
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const handleQuestionnaireSubmit = (weights) => {
    setWeights(weights);
    setQuestionnaireCompleted(true);
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const roads = useSelector(roadsSelector);

  useEffect(() => {
    dispatch(searchRoads({ query: "" }));
  }, []);

  const handleSearch = ({ target }) => {
    dispatch(searchRoads({ query: target.value }));
  };

  const handleRoadClick = (id) => {
    history.push(`${Routes.ROAD_PROFILE}/${id}`);
  };
  let className = props.primary ? "primary" : "";
  return (
    <Container className={`${className} mainpage container`}>
      <Header />
      {!questionnaireCompleted ? (
        <Questionnaire onSubmit={handleQuestionnaireSubmit} />
      ) : (
        <RoadsContainer>
          <TextField
            className={`${className} searchfieldd`}
            label='Шукати потяг...'
            type='text'
            onChange={handleSearch}
          />
          {roads.map((road) => (
            <RoadCard
              className={`${className} roadcard`}
              {...road}
              key={road._id}
              onClick={handleRoadClick}
              weights={weights}
            />
          ))}
        </RoadsContainer>
      )}
    </Container>
  );
};
const Container = styled.div``;
const RoadsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default WeightedRatingPage;
