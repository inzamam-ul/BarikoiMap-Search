import React, { createContext, useContext, useReducer, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import PropTypes from "prop-types";
import reducer from "./reducer";
import toggleColor from "./actions/toggleColor";

const initialState = {
  colorMode: "light",
  toggleColorMode: () => {},
  selectedLocation: null,
  hoveredLocation: null,
};

const Context = createContext(initialState);

// eslint-disable-next-line
export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();

  const toggleColorMode = () => {
    toggleColor(dispatch);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.colorMode,
        },
      }),
    [state.colorMode]
  );

  return (
    <Context.Provider
      value={{ state, dispatch, mapRef, containerRef, toggleColorMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node, // Use PropTypes.node for any node (including JSX)
};

export default ContextProvider;
