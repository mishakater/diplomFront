import React from "react";
import { Rating } from "@material-ui/lab";
import styled from "styled-components";
import { mergeMean, mergeWeightedMean } from "../../utils";

const RoadCard = ({
  onClick,
  roadName,
  region,
  direction,
  length,
  _id,
  ratings,
  weights,
}) => {
  const mergedRatings = ratings.length ? mergeMean(ratings) : {};

  const mergedWeightedRatings =
    weights && ratings.length ? mergeWeightedMean(ratings, weights) : null;

  const handleClick = () => {
    onClick?.(_id);
  };

  return (
    <Container onClick={handleClick}>
      <Row>
        <div>{roadName}</div>
      </Row>
      <Row>
        <div>
          {mergedWeightedRatings ? (
            <Rating
              readOnly
              precision={0.1}
              value={mergedWeightedRatings.mean}
              max={10}
            />
          ) : (
            <Rating
              readOnly
              precision={0.1}
              value={mergedRatings.mean}
              max={10}
            />
          )}
        </div>
        <div>
          {region} {direction}
        </div>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 680px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  background-color: white;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default RoadCard;
