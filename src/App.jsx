import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useValue } from "./context/ContextProvider";
import MapContainer from "./components/MapContainer";

function App() {
  const theme = useTheme();
  const { toggleColorMode } = useValue();
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
        height: "100vh",
      }}
    >
      <IconButton
        sx={{ position: "absolute", bottom: 30, right: 5, zIndex: 99999 }}
        onClick={toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon sx={{ fontSize: 30 }} />
        ) : (
          <Brightness4Icon sx={{ fontSize: 30 }} />
        )}
      </IconButton>
      <MapContainer />
    </Box>
  );
}

export default App;
