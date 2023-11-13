const toggleColor = async (dispatch) => {
  console.log("toggling");
  dispatch({
    type: "TOGGLE_COLOR",
  });
};

export default toggleColor;
