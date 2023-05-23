import React, { useEffect } from "react";
import styled from "styled-components";
import { Icon, IconButton } from "@material-ui/core";
import { TextField, Link } from "@material-ui/core";
import { useHistory } from "react-router";
import { Routes } from "../../constants";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/creators";
import imageSrc from "../../img/logo2.png";
import "../../App.css";
import { searchRoads } from "../../store/actions/creators";

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    history.push(Routes.HOME);
  };

  const handleLogout = () => {
    dispatch(logout({}));
    history.push(Routes.LOGIN);
  };

  const handleProfileClick = () => {
    history.push(Routes.USER_PROFILE);
  };

  const handleMapClick = () => {
    history.push(Routes.MAP);
  };
  const handleWeightedClick = () => {
    history.push(Routes.WEIGHTED);
  };

  console.log(history.location);

  let className = props.primary ? "primary" : "";
  return (
    <Container className={`${className} header-container`}>
      <Logo onClick={handleLogoClick} className={`${className} logo`}>
        <img src={imageSrc} alt={"logo"} />
      </Logo>

      <Navbar>
        {history.location.pathname !== "/map" && (
          <Link
            onClick={handleMapClick}
            style={{ marginRight: "50px", cursor: "pointer" }}
          >
            Інтерактивна карта
          </Link>
        )}
        {history.location.pathname !== "/personal-rating" && (
          <Link
            onClick={handleWeightedClick}
            style={{ marginRight: "50px", cursor: "pointer" }}
          >
            Персонализований рейтинг
          </Link>
        )}

        <IconButton
          onClick={handleProfileClick}
          aria-label='profile'
          style={{ marginRight: "10px" }}
        >
          <Icon>account_circle</Icon>
        </IconButton>
        <IconButton onClick={handleLogout} aria-label='logout'>
          <Icon>logout</Icon>
        </IconButton>
      </Navbar>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  font-size: 22px;
  cursor: pointer;
`;

export default Header;
