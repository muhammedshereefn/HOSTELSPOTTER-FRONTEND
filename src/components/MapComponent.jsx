import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

const MapComponent = ({ onLocationSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10,
    width: '100%',
    height: '400px',
  });
  const [selected, setSelected] = useState(null);

  const handleMapClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    setSelected({ latitude, longitude });
    onLocationSelect(latitude, longitude);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onClick={handleMapClick}
    >
      {selected && (
        <Marker latitude={selected.latitude} longitude={selected.longitude}>
          <div style={{ backgroundColor: 'red', width: '10px', height: '10px', borderRadius: '50%' }} />
        </Marker>
      )}
    </ReactMapGL>
  );
};

export default MapComponent;
