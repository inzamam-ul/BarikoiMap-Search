import { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import PropTypes from "prop-types";
import { useValue } from "../../context/ContextProvider";
import setHoveredLocation from "../../context/actions/setHoveredLocation";
import setSelectedLocation from "../../context/actions/setSelectedLocation";
import { Box, Chip, Typography } from "@mui/material";

const formattedValues = (values) => {
  return values.map((item) => ({
    label: item.address,
    value: item.address,
    ...item,
  }));
};

const GeoAutoComplete = () => {
  const [options, setOption] = useState();
  const {
    dispatch,
    mapRef,
    state: { selectedLocation, colorMode },
  } = useValue();

  const promiseOptions = async (inputValue) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://barikoi.xyz/v2/api/search/autocomplete/place?api_key=${
        import.meta.env.VITE_BKOI_API_KEY
      }=${inputValue}&city=${inputValue}&bangla=true`,
      headers: {},
    };
    const response = await axios(config);
    setOption(formattedValues(response.data.places));
    return formattedValues(response.data.places);
  };

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <Box
          onMouseEnter={() => {
            setHoveredLocation(props.data, dispatch);
            mapRef.current?.setCenter({
              lat: props.data.latitude,
              lng: props.data.longitude,
            });
          }}
        >
          <Typography fontWeight="bold" variant="body1" component="p">
            {props?.data?.label.split(",")[0]}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {props?.data?.area}, {props?.data?.city}
          </Typography>

          <Typography variant="subtitle2" component="p">
            <Chip sx={{ borderRadius: 1 }} label={props?.data?.pType} />
          </Typography>
        </Box>
      </components.Option>
    );
  };

  Option.propTypes = {
    data: PropTypes.object,
  };

  return (
    <AsyncSelect
      placeholder="Search"
      components={{ DropdownIndicator: null, IndicatorSeparator: null, Option }}
      isClearable
      cacheOptions
      defaultOptions={options}
      loadOptions={promiseOptions}
      onChange={(newValue) => {
        setSelectedLocation(newValue, dispatch);
        setHoveredLocation(newValue, dispatch);
      }}
      value={selectedLocation}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colorMode === "light" ? "" : "gray",
          color: colorMode === "light" ? "" : "white",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: colorMode === "light" ? "" : "white",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: colorMode === "light" ? "" : "white",
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colorMode === "light" ? "" : "gray",
          color: colorMode === "light" ? "" : "white",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: state.isSelected
            ? colorMode === "light"
              ? "black"
              : "white"
            : "",
          backgroundColor: state.isSelected
            ? colorMode === "light"
              ? "lightGray"
              : "black"
            : "",
          ":hover": {
            backgroundColor: colorMode === "light" ? "lightBlue" : "navy", // Add your hover styles here
          },
        }),
        noOptionsMessage: (baseStyles) => ({
          ...baseStyles,
          color: colorMode === "light" ? "" : "white",
        }),
      }}
    />
  );
};

export default GeoAutoComplete;
