import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { roadSelector } from "../store/selectors/roads";
import { Button } from "@material-ui/core";
import { commentRoad, rateRoad, searchRoads } from "../store/actions/creators";
import { userSelector } from "../store/selectors/user";
import { Header } from "../components";
import styled from "styled-components";
import { Rating } from "@material-ui/lab";
import { mergeMean } from "../utils";
//import imageSrc from 'https://ibb.co/hHrw2dt';

const RoadProfilePage = ({ postData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const road = useSelector(roadSelector(id));
  const roads = useSelector(roadSelector);
  const user = useSelector(userSelector);
  const mergedRatings = road?.ratings?.length ? mergeMean(road?.ratings) : {};
  const [comment, setComment] = useState("");
  const [rateState, setRateState] = useState({
    artificialConstructions: mergedRatings.artificialConstructions,
    engineeringArrangement: mergedRatings.engineeringArrangement,
    roadSurface: mergedRatings.roadSurface,
    sanitaryElements: mergedRatings.sanitaryElements,
    serviceObjects: mergedRatings.serviceObjects,
    technicalMeans: mergedRatings.technicalMeans,
  });

  useEffect(() => {
    const mergedRatings = road?.ratings?.length ? mergeMean(road?.ratings) : {};
    setRateState({
      artificialConstructions: mergedRatings.artificialConstructions,
      engineeringArrangement: mergedRatings.engineeringArrangement,
      roadSurface: mergedRatings.roadSurface,
      sanitaryElements: mergedRatings.sanitaryElements,
      serviceObjects: mergedRatings.serviceObjects,
      technicalMeans: mergedRatings.technicalMeans,
    });
  }, [road]);

  const handleChange = (key) => (e, val) => {
    setRateState((s) => ({
      ...s,
      [key]: val,
    }));
  };

  const handleRate = () => {
    dispatch(
      rateRoad({
        userId: user._id,
        roadId: road._id,
        criteria: rateState,
        onSuccess: () => {
          dispatch(searchRoads({ query: "" }));
        },
      })
    );
  };

  const handleCommentChange = ({ target: { value } }) => {
    setComment(value);
  };

  const handleComment = () => {
    dispatch(
      commentRoad({
        id: road._id,
        userId: user._id,
        userName: user.email,
        text: comment,
        onSuccess: () => {
          dispatch(searchRoads({ query: "" }));
          setComment("");
        },
      })
    );
  };

  return (
    <div className='container'>
      <Header />

      <Row
        style={{
          padding: "0 30px",
          fontSize: "40px",
          fontWeight: "bold",
          marginTop: "100px",
        }}
      >
        Потяг: {road?.roadName}
      </Row>
      <img
        style={{ width: "500px", padding: "30px 30px 30px 30px" }}
        src={`https://i.ibb.co/DbQmm7x/route-Guts.png`}
        alt={"map"}
      />

      <Row
        style={{
          padding: "0 30px",
          width: "auto",
          paddingTop: "30px",
          fontSize: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "raw",
            alignItems: "center",
          }}
        >
          Середній рейтинг потягу:
          <Rating
            readOnly
            precision={0.1}
            value={mergedRatings.mean}
            max={10}
          />
        </div>
      </Row>

      <Content>
        <Row>
          Стан рухомого стану
          <Rating
            precision={0.1}
            onChange={handleChange("artificialConstructions")}
            value={rateState.artificialConstructions}
            max={10}
          />
        </Row>
        <Row>
          Ступінь чистоти
          <Rating
            precision={0.1}
            onChange={handleChange("engineeringArrangement")}
            value={rateState.engineeringArrangement}
            max={10}
          />
        </Row>
        <Row>
          Комфортабельність перевезень
          <Rating
            precision={0.1}
            onChange={handleChange("roadSurface")}
            value={rateState.roadSurface}
            max={10}
          />
        </Row>
        <Row>
          Дотримання графіку перевезень
          <Rating
            precision={0.1}
            onChange={handleChange("sanitaryElements")}
            value={rateState.sanitaryElements}
            max={10}
          />
        </Row>
        <Row>
          Доступність послуг для осіб з особливими потребами
          <Rating
            precision={0.1}
            onChange={handleChange("serviceObjects")}
            value={rateState.serviceObjects}
            max={10}
          />
        </Row>
        {/* <Row>
          Штучні споруди(мости, шляхопроводи, естакади)
          <Rating
            precision={0.1}
            onChange={handleChange("technicalMeans")}
            value={rateState.technicalMeans}
            max={10}
          />
        </Row> */}

        <Button
          style={{ width: "20%", marginTop: "20px" }}
          variant='outlined'
          onClick={handleRate}
        >
          Оцінити
        </Button>

        <Comments>
          {road.comments.map((comment) => (
            <Comment style={{ width: "50%", marginTop: "35px" }}>
              <UserEmail>{comment.userName}</UserEmail>

              {comment.text}
            </Comment>
          ))}
        </Comments>
        <textarea
          style={{ margin: "20px 0", height: "100px", width: "45%" }}
          value={comment}
          onChange={handleCommentChange}
        />
        <Button
          style={{ width: "20%", marginTop: "20px" }}
          variant='outlined'
          disabled={!comment.length}
          onClick={handleComment}
        >
          Залишити коментар
        </Button>
      </Content>
    </div>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 30px;
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background: lightblue;
  border-radius: 8px;
  margin: 2px 0;
`;

const UserEmail = styled.div`
  font-weight: 500;
  margin-bottom: 10px;
`;

export default RoadProfilePage;
