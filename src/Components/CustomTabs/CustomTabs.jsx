/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";

const StyledSwipeableViews = styled(SwipeableViews)`
  width: 100%;
`;
const StyledDiv = styled.div`
  padding: 13px 8px;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const boxStyle = {
  flexGrow: 1,
  display: "flex",
  height: 224,
};

const tabVerticalStyle = {
  "&:not(:last-child)": {
    borderBottom: "1.5px solid var(--color-border-2)",
  },
};
const tabHorizontalStyle = {
  "&:not(:last-child)": {
    borderRight: "1.5px solid var(--color-border-2)",
  },
};

export default function CustomTabs({ content, orientation }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={orientation && boxStyle}>
      {/* <AppBar position="static"> */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        orientation={orientation ? orientation : "horizontal"}
        // variant="fullWidth
        aria-label="full width tabs example"
        sx={{
          backgroundColor: "transparent",
          "& > .MuiTabs-scroller > .MuiTabs-flexContainer": {
            justifyContent: "center",
          },
        }}
      >
        {content.map((tab, index) => (
          <Tab
            key={index}
            sx={
              orientation
                ? { ...tabVerticalStyle, color: "var(--color-text)" }
                : { ...tabHorizontalStyle, color: "var(--color-text)" }
            }
            label={tab.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      <StyledSwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {content.map((tab, index) => (
          <StyledDiv key={index} value={value} dir={theme.direction}>
            <span>{tab.component}</span>
          </StyledDiv>
        ))}
      </StyledSwipeableViews>
    </Box>
  );
}
