import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/creators";
import { Routes } from "../constants";
import { useHistory } from "react-router";
import imageSrc from "../img/logo2.png";

const AuthenticationPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange =
    (onChangeFn) =>
    ({ target }) => {
      onChangeFn(target.value);
    };

  const handleSubmit = () => {
    dispatch(
      login({
        email,
        password,
        onSuccess: () => {
          history.push(Routes.HOME);
        },
      })
    );
  };

  return (
    <Container>
      <Logg>
        <img src={imageSrc} alt={"logo"} />
      </Logg>
      <InnerContainer>
        <h2>Вітаємо в UATrains</h2>
        <TextField
          label='Електронна адреса'
          type='email'
          onChange={handleChange(setEmail)}
        />
        <TextField
          label='Пароль'
          type='password'
          onChange={handleChange(setPassword)}
        />
        <Button color='primary' variant='contained' onClick={handleSubmit}>
          Авторизуватися
        </Button>
        <div>
          Ще немає аккаунту? <a href={Routes.REGISTRATION}>Зареєструватися</a>
        </div>
      </InnerContainer>
    </Container>
  );
};

const Logg = styled.div`
  hight: 15px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  width: 40vw;
  height: 40vh;
`;

export default AuthenticationPage;
