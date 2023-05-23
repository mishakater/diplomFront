import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Routes } from "../constants";
import "../App.css";
import { Header } from "../components";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../constants/osm-providers";
import { useRef } from "react";

const MapPage = (props) => {
  const [center, setCenter] = useState([49.317991, 31.445364]);
  const ZOOM = 6;
  const mapRef = useRef();
  let className = props.primary ? "primary" : "";
  return (
    <Container className={`${className} mainpage container`}>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "100px",
        }}
      >
        <MapContainer center={center} zoom={ZOOM} ref={mapRef}>
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          ></TileLayer>
        </MapContainer>
      </div>
    </Container>
  );
};
const Container = styled.div``;

export default MapPage;
