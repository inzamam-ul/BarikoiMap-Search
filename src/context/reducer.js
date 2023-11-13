const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_COLOR":
      return {
        ...state,
        colorMode: state.colorMode === "light" ? "dark" : "light",
      };
    case "SET_HOVERED_LOCATION":
      return {
        ...state,
        hoveredLocation: action.payload,
      };
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload,
      };

    default:
      throw new Error("No matched action!");
  }
};

export default reducer;
