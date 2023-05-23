import React from "react";
import { useState } from "react";

const criteria = [
  "roadSurface",
  "technicalMeans",
  "engineeringArrangement",
  "serviceObjects",
  "sanitaryElements",
  "artificialConstructions",
];

const Questionnaire = (onSubmit) => {
  const [weights, setWeights] = useState({});
  const [currentPair, setCurrentPair] = useState([0, 1]);

  const handleButtonClick = (event) => {
    const { name } = event.target;
    setWeights((prevWeights) => ({
      ...prevWeights,
      [criteria[currentPair[0]]]: name === "first" ? 1 : 0,
      [criteria[currentPair[1]]]: name === "second" ? 1 : 0,
    }));
    if (currentPair[1] < criteria.length - 1) {
      setCurrentPair(([first, second]) => [first, second + 1]);
    } else if (currentPair[0] < criteria.length - 2) {
      setCurrentPair(([first]) => [first + 1, first + 2]);
    } else {
      onSubmit(weights);
    }
  };

  return (
    <div>
      <h2>Which criterion is more important?</h2>
      <button name='first' onClick={handleButtonClick}>
        {criteria[currentPair[0]]}
      </button>
      <button name='second' onClick={handleButtonClick}>
        {criteria[currentPair[1]]}
      </button>
    </div>
  );
};

export default Questionnaire;
