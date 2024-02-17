import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const homeTexts = [
  {
    head: "BANKING SOLUTIONS",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. eveniet maxime corrupti, nisi adipisicing elit. Quaerat eveniet maxime corrupti, nisi ",
  },
  {
    head: "FINANCIAL SOLUTIONS",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. eveniet maxime corrupti, nisi adipisicing elit. Quaerat eveniet maxime corrupti, nisi ",
  },
  {
    head: "SAVINGS ACCOUNTS",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. eveniet maxime corrupti, nisi adipisicing elit. Quaerat eveniet maxime corrupti, nisi ",
  },
];

export default function Slider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = homeTexts.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "75%", flexGrow: 1, cursor: "pointer" }}>
      <AutoPlaySwipeableViews
        interval={3000}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {homeTexts.map((step, index) => (
          <div key={step.head}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box sx={{ height: "100", width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "3rem",
                    color: "#fff",
                    fontWeight: "900",
                    letterSpacing: " 0.3rem",
                    textAlign: "center",
                  }}
                >
                  {homeTexts[activeStep].head}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    color: " #fff",
                    lineHeight: "2rem",
                    textAlign: "center",
                  }}
                >
                  {homeTexts[activeStep].desc}
                </Typography>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          background: "transparent",
          justifyContent: "center",
          display: "flex",
        }}
      />
    </Box>
  );
}
