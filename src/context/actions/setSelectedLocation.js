const setSelectedLocation = async (location, dispatch) => {
  console.log("Setting hovered location");
  dispatch({
    type: "SET_SELECTED_LOCATION",
    payload: location,
  });
};

export default setSelectedLocation;
