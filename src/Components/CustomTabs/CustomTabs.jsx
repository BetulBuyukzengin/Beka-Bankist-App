/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";

const StyledSwipeableViews = styled(SwipeableViews)`
  width: 100%;
`;
const StyledDiv = styled.div``;

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

export default function CustomTabs({
  content,
  orientation,
  tabName,
  mainTabLabel,
}) {
  // const mainTabLabel = [];
  // if (content.length === 4) {
  //   content.map((tab) => {
  //     mainTabLabel.push(tab.label);
  //   });
  // }

  const theme = useTheme();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  useEffect(
    function () {
      if (
        tabName === "transactionsTab" &&
        searchParams.get("transactions-tab")
      ) {
        setTabIndex(+searchParams.get("transactions-tab"));
      }

      if (
        tabName === "recipientAccountTab" &&
        searchParams.get("recipient-account-tab")
      ) {
        setTabIndex(+searchParams.get("recipient-account-tab"));
      }
      if (
        tabName === "newRecipientTab" &&
        searchParams.get("new-recipient-tab")
      ) {
        setTabIndex(+searchParams.get("new-recipient-tab"));
      }
    },
    [searchParams, tabName]
  );

  return (
    <Box sx={orientation && boxStyle}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        orientation={orientation ? orientation : "horizontal"}
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
            onClick={() => {
              mainTabLabel.map(
                (label) =>
                  tab.label === label && searchParams.set("status", label)
              );

              if (tabName === "transactionsTab") {
                searchParams.set("transactions-tab", index);
                setSearchParams(searchParams);
              }

              if (tabName === "recipientAccountTab") {
                searchParams.set("recipient-account-tab", index);
                setSearchParams(searchParams);
              }

              if (tabName === "newRecipientTab") {
                searchParams.set("new-recipient-tab", index);
                setSearchParams(searchParams);
              }
            }}
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
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {content.map((tab, index) => (
          <StyledDiv key={index} value={tabIndex} dir={theme.direction}>
            <span>{tab.component}</span>
          </StyledDiv>
        ))}
      </StyledSwipeableViews>
    </Box>
  );
}
