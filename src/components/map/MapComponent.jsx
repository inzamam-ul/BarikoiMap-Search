import { useEffect, useRef } from "react";
import { useValue } from "../../context/ContextProvider";
import ReactMapGL, {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import PinBlue from "../../assets/markers/pin-blue.png";
import PinGray from "../../assets/markers/pin-gray.png";
import PinGreen from "../../assets/markers/pin-green.png";
import PinOrange from "../../assets/markers/pin-orange.png";
import PinPink from "../../assets/markers/pin-pink.png";
import PinPurple from "../../assets/markers/pin-purple.png";
import PinRed from "../../assets/markers//pin-red.png";
import PinYellow from "../../assets/markers/pin-yellow.png";

const MapComponent = () => {
  const {
    state: { colorMode, hoveredLocation, selectedLocation },
    mapRef,
  } = useValue();

  const geoControlRef = useRef();

  const getMarker = (placeType) => {
    switch (placeType) {
      case "Admin":
        return PinGreen;
      case "Office":
        return PinRed;
      case "Shop":
        return PinPink;
      case "Education":
        return PinYellow;
      case "Commercial":
        return PinOrange;
      case "Industry":
        return PinPurple;
      case "Religious Place":
        return PinGray;

      default:
        return PinBlue;
    }
  };

  useEffect(() => {
    // Activate as soon as the control is loaded
    if (geoControlRef.current) geoControlRef.current?.trigger();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoControlRef.current]);

  useEffect(() => {
    // Recenter the marker to the selected location while hovered location is empty
    if (!hoveredLocation && selectedLocation)
      mapRef.current?.setCenter({
        lat: selectedLocation?.latitude,
        lng: selectedLocation?.longitude,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredLocation, mapRef.current]);

  console.log(selectedLocation);
  return (
    <ReactMapGL
      style={{ width: "100%", height: "100vh" }}
      initialViewState={{ latitude: 23.7607, longitude: 90.3914, zoom: 10 }}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle={
        colorMode === "light"
          ? "mapbox://styles/mapbox/streets-v12"
          : "mapbox://styles/mapbox/navigation-night-v1"
      }
      attributionControl={false}
      reuseMaps
      ref={mapRef}
    >
      {hoveredLocation && (
        <Marker
          latitude={hoveredLocation?.latitude}
          longitude={hoveredLocation?.longitude}
          anchor="bottom"
        >
          <img src={getMarker(hoveredLocation?.pType)} />
        </Marker>
      )}
      {selectedLocation && (
        <Marker
          latitude={selectedLocation?.latitude}
          longitude={selectedLocation?.longitude}
          anchor="bottom"
        >
          <img src={getMarker(selectedLocation?.pType)} />
        </Marker>
      )}
      <GeolocateControl ref={geoControlRef} />
      <FullscreenControl />
      <NavigationControl />
      <ScaleControl />

      <AttributionControl customAttribution="Map design by Inzamam" />
    </ReactMapGL>
  );
};

export default MapComponent;
