import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "./constants";
import {
  AuthenticationPage,
  MainPage,
  RegistrationPage,
  RoadProfilePage,
} from "./pages";
import MapPage from "./pages/MapPage";
import WeightedRatingPage from "./pages/WeightedRatingPage";
import { PrivateRoute } from "./components";
import { useSelector } from "react-redux";
import { authenticatedSelector } from "./store/selectors/user";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  const authenticated = useSelector(authenticatedSelector);

  return (
    <BrowserRouter>
      <Route exact path={Routes.LOGIN} component={AuthenticationPage} />
      <Route exact path={Routes.REGISTRATION} component={RegistrationPage} />
      <PrivateRoute
        exact
        path={Routes.HOME}
        component={MainPage}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={Routes.USER_PROFILE}
        component={UserProfilePage}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={`${Routes.ROAD_PROFILE}/:id`}
        component={RoadProfilePage}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={Routes.MAP}
        component={MapPage}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={Routes.WEIGHTED}
        component={WeightedRatingPage}
        authenticated={authenticated}
      />
    </BrowserRouter>
  );
}

export default App;
