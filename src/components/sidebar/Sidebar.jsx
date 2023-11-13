import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logoBlack from "@/assets/barikoi-logo-black.svg";
import logoWhite from "@/assets/barikoi-logo-white.svg";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import GeoAutoComplete from "../geocoder/GeoAutoComplete";
import { useValue } from "../../context/ContextProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import setHoveredLocation from "../../context/actions/setHoveredLocation";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = ({ open, drawerWidth, handleDrawerClose }) => {
  const {
    state: { selectedLocation },
    toggleColorMode,
    dispatch,
  } = useValue();
  const theme = useTheme();
  console.log({ selectedLocation });
  return (
    <Drawer
      onMouseLeave={() => {
        setHoveredLocation(null, dispatch);
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          style={{ height: 30, width: "auto", marginLeft: 10 }}
          src={theme.palette.mode === "dark" ? logoWhite : logoBlack}
          alt="logo"
          loading="lazy"
        />
        <Box>
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon sx={{ fontSize: 25 }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: 25 }} />
            )}
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
      </DrawerHeader>
      <Divider />
      <List sx={{ padding: 2 }}>
        <Box>
          <GeoAutoComplete />
        </Box>
        {selectedLocation && (
          <Box
            sx={{
              border: "1px solid gray",
              borderRadius: 1,
              padding: 1,
              marginTop: 1,
            }}
          >
            <Typography fontWeight="bold" variant="body1" component="p">
              {selectedLocation?.label.split(",")[0]}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {selectedLocation?.area}, {selectedLocation?.city}
            </Typography>

            <Typography variant="subtitle2" component="p">
              <Chip sx={{ borderRadius: 1 }} label={selectedLocation?.pType} />
            </Typography>
          </Box>
        )}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  drawerWidth: PropTypes.number,
};

export default Sidebar;
