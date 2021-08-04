import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as markerDate from "./data/markers.json";

export default function App() {
  let [viewport, setViewport] = useState({
    latitude: -3.836911,
    longitude: -38.4894,
    zoom: 10,
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={"pk.eyJ1IjoicGF1bG9kaWFzOTkiLCJhIjoiY2twMmpkdHF2MTdsZTJ1bXdiYXJycjU2diJ9.inYoilB4fwiItq7Acqh7aQ"}
        mapStyle={"mapbox://styles/mapbox/dark-v10"}
        {...viewport}
        onViewportChange={(newView) => setViewport(newView)}
      >
        {markerDate.features.map(marker => (
          <Marker
            key={marker.properties.MARKER_ID}
            latitude={marker.geometry.coordinates[1]}
            longitude={marker.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedMarker(marker);
              }}
            >
              <img src="/location2.png" alt="Marker" />
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            className="popup"
            latitude={selectedMarker.geometry.coordinates[1]}
            longitude={selectedMarker.geometry.coordinates[0]}
            onClose={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <h2>{selectedMarker.properties.NAME}</h2>
              <p>{selectedMarker.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}