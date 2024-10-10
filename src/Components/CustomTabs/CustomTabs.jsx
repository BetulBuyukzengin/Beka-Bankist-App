/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { media48em } from "../../Constants/constants";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const getBoxStyle = (orientation) => ({
  flexGrow: 1,
  display: "flex",
  minHeight: 180,
  flexDirection: orientation === "horizontal" ? "column" : "row",
});
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

export default function CustomTabs({ content, orientation, tabName }) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // // Swipeable (kaydırma) hareketlerini yöneten kanca
  // const swipeHandlers = useSwipeable({
  //   // Sola kaydırıldığında tabIndex artıyor (bir sonraki sekmeye geçiyor)
  //   onSwipedLeft: () =>
  //     setTabIndex((prev) => Math.min(prev + 1, content.length - 1)),
  //   // Sağa kaydırıldığında tabIndex azalıyor (bir önceki sekmeye geçiyor)
  //   onSwipedRight: () => setTabIndex((prev) => Math.max(prev - 1, 0)),
  // });

  // Arama parametrelerine göre tabIndex ayarlanıyor
  useEffect(() => {
    if (tabName === "transactionsTab" && searchParams.get("transactions-tab")) {
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
  }, [searchParams, tabName]);

  return (
    // <Box sx={orientation && getBoxStyle(orientation)} {...swipeHandlers}>
    <Box sx={orientation && getBoxStyle(orientation)}>
      <Tabs
        value={tabIndex}
        onChange={(event, newValue) => setTabIndex(newValue)}
        indicatorColor="primary"
        textColor="inherit"
        orientation={orientation ? orientation : "horizontal"}
        aria-label="full width tabs example"
        sx={{
          backgroundColor: "transparent",
          "& > .MuiTabs-scroller > .MuiTabs-flexContainer": {
            justifyContent: "center",
            [media48em]: {
              justifyContent: "space-evenly",
            },
          },
        }}
      >
        {content.map((tab, index) => (
          <Tab
            disabled={tab.label === "With Phone Number"}
            onClick={() => {
              searchParams.set("status", tab.label);

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
                ? {
                    ...tabVerticalStyle,
                    color: "var(--color-text)",
                    "@media  (max-width:48em)": {
                      padding: ".5rem",
                      fontSize: ".7rem!important",
                    },
                    "@media  (max-width:31.25em)": {
                      fontSize: ".6rem!important",
                    },
                  }
                : {
                    ...tabHorizontalStyle,

                    "@media  (max-width:48em)": {
                      fontSize: ".7rem!important",
                    },
                    "@media  (max-width:31.25em)": {
                      fontSize: ".6rem!important",
                      minWidth: "40px!important",
                      padding: "2px 4px",
                    },
                  }
            }
            label={tab.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      {/* 
      check!
      <div style={{ minHeight: "70dvh" }}>{content[tabIndex].component}</div> */}
      <div>{content[tabIndex].component}</div>
    </Box>
  );
}
