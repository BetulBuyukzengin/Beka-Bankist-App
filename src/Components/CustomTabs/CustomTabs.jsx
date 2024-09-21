// /* eslint-disable react/prop-types */
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
// import Typography from "@mui/material/Typography";
// import PropTypes from "prop-types";
// import * as React from "react";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import SwipeableViews from "react-swipeable-views";
// import styled from "styled-components";

// const StyledSwipeableViews = styled(SwipeableViews)`
//   width: 100%;
//   overflow: hidden; // Boşlukları minimize etmek için ekleyebilirsiniz

//   /* margin-bottom: 10rem; */

//   /* @media (max-width: 48em) {
//     overflow: scroll;
//     height: 500px;

//   } */
// `;
// const StyledDiv = styled.div`
//   height: auto !important;
// `;

// // function TabPanel(props) {
// //   const { children, value, index, ...other } = props;

// //   return (
// //     <div
// //       role="tabpanel"
// //       hidden={value !== index}
// //       id={`full-width-tabpanel-${index}`}
// //       aria-labelledby={`full-width-tab-${index}`}
// //       {...other}
// //     >
// //       {value === index && (
// //         <Box sx={{ p: 3 }}>
// //           <Typography>{children}</Typography>
// //         </Box>
// //       )}
// //     </div>
// //   );
// // }

// // TabPanel.propTypes = {
// //   children: PropTypes.node,
// //   index: PropTypes.number.isRequired,
// //   value: PropTypes.number.isRequired,
// // };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }

// const boxStyle = {
//   flexGrow: 1,
//   display: "flex",
//   height: 224,
// };

// const tabVerticalStyle = {
//   "&:not(:last-child)": {
//     borderBottom: "1.5px solid var(--color-border-2)",
//   },
// };
// const tabHorizontalStyle = {
//   "&:not(:last-child)": {
//     borderRight: "1.5px solid var(--color-border-2)",
//   },
// };

// export default function CustomTabs({
//   content,
//   orientation,
//   tabName,
//   mainTabLabel,
// }) {
//   const theme = useTheme();
//   const [tabIndex, setTabIndex] = React.useState(0);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setTabIndex(index);
//   };

//   useEffect(
//     function () {
//       if (
//         tabName === "transactionsTab" &&
//         searchParams.get("transactions-tab")
//       ) {
//         setTabIndex(+searchParams.get("transactions-tab"));
//       }

//       if (
//         tabName === "recipientAccountTab" &&
//         searchParams.get("recipient-account-tab")
//       ) {
//         setTabIndex(+searchParams.get("recipient-account-tab"));
//       }
//       if (
//         tabName === "newRecipientTab" &&
//         searchParams.get("new-recipient-tab")
//       ) {
//         setTabIndex(+searchParams.get("new-recipient-tab"));
//       }
//     },
//     [searchParams, tabName]
//   );

//   return (
//     // Burası değil !
//     <Box sx={orientation && boxStyle}>
//       <Tabs
//         value={tabIndex}
//         onChange={handleChange}
//         indicatorColor="primary"
//         textColor="inherit"
//         orientation={orientation ? orientation : "horizontal"}
//         aria-label="full width tabs example"
//         sx={{
//           backgroundColor: "transparent",
//           "& > .MuiTabs-scroller > .MuiTabs-flexContainer": {
//             justifyContent: "center",
//           },
//         }}
//       >
//         {content.map((tab, index) => (
//           <Tab
//             disabled={tab.label === "With Phone Number"}
//             onClick={() => {
//               searchParams.set("status", tab.label);
//               // mainTabLabel.map(
//               //   (label) =>
//               //     tab.label === label && searchParams.set("status", label)
//               // );

//               if (tabName === "transactionsTab") {
//                 searchParams.set("transactions-tab", index);
//                 setSearchParams(searchParams);
//               }

//               if (tabName === "recipientAccountTab") {
//                 searchParams.set("recipient-account-tab", index);
//                 setSearchParams(searchParams);
//               }

//               if (tabName === "newRecipientTab") {
//                 searchParams.set("new-recipient-tab", index);
//                 setSearchParams(searchParams);
//               }
//             }}
//             key={index}
//             sx={
//               orientation
//                 ? {
//                     ...tabVerticalStyle,
//                     color: "var(--color-text)",
//                     "@media  (max-width:48em)": {
//                       padding: ".5rem",
//                       fontSize: ".7rem!important",
//                     },
//                     "@media  (max-width:31.25em)": {
//                       fontSize: ".6rem!important",
//                     },
//                   }
//                 : {
//                     ...tabHorizontalStyle,
//                     color: "var(--color-text)",

//                     "@media  (max-width:48em)": {
//                       fontSize: ".7rem!important",
//                     },
//                     "@media  (max-width:31.25em)": {
//                       fontSize: ".6rem!important",
//                       minWidth: "40px!important",
//                       padding: "2px 4px",
//                     },
//                   }
//             }
//             label={tab.label}
//             {...a11yProps(index)}
//           />
//         ))}
//       </Tabs>

//       <StyledSwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={tabIndex}
//         onChangeIndex={handleChangeIndex}
//         animateHeight
//       >
//         {content.map((tab, index) => (
//           <div
//             style={{ minHeight: "70dvh" }}
//             key={index}
//             value={tabIndex}
//             dir={theme.direction}
//           >
//             {tab.component}
//           </div>
//         ))}
//       </StyledSwipeableViews>
//     </Box>
//   );
// }

/////////////
/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // useSwipeable'ı ekliyoruz
import styled from "styled-components";

// İçerik bölümü için basit bir stil
const StyledDiv = styled.div`
  height: auto !important;
`;

// a11yProps fonksiyonu erişilebilirlik için
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
  const theme = useTheme();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // Swipeable (kaydırma) hareketlerini yöneten kanca
  const swipeHandlers = useSwipeable({
    // Sola kaydırıldığında tabIndex artıyor (bir sonraki sekmeye geçiyor)
    onSwipedLeft: () =>
      setTabIndex((prev) => Math.min(prev + 1, content.length - 1)),
    // Sağa kaydırıldığında tabIndex azalıyor (bir önceki sekmeye geçiyor)
    onSwipedRight: () => setTabIndex((prev) => Math.max(prev - 1, 0)),
  });

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
    // Burada swipe hareketlerini yöneten box, useSwipeable kullanılıyor
    <Box sx={orientation && boxStyle} {...swipeHandlers}>
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
                    color: "var(--color-text)",
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

      {/* İçerik burada gösteriliyor */}
      <div style={{ minHeight: "70dvh" }}>{content[tabIndex].component}</div>
    </Box>
  );
}
