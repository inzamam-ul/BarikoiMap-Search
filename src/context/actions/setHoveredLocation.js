const setHoveredLocation = async (location, dispatch) => {
  console.log("Setting hovered location");
  dispatch({
    type: "SET_HOVERED_LOCATION",
    payload: location,
  });
};

export default setHoveredLocation;
