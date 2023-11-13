const setHoveredLocation = async (location, dispatch) => {
  dispatch({
    type: "SET_HOVERED_LOCATION",
    payload: location,
  });
};

export default setHoveredLocation;
