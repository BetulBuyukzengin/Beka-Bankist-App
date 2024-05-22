/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function StepperComponent({
  transactionSteps,
  activeStep,
  setActiveStep,
}) {
  const [skipped, setSkipped] = React.useState(new Set());
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {transactionSteps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel
                {...labelProps}
                sx={{
                  "& > span > svg > text": {
                    fill: "var(--color-background)!important",
                  },
                }}
              ></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {transactionSteps.map((transaction, index) => {
          return (
            <React.Fragment key={index}>
              {index === activeStep && (
                <Box
                  sx={{
                    height: "22rem",
                    overflowY: "auto",
                  }}
                >
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {transaction.label}
                  </Typography>
                  <Box>{transaction.component}</Box>
                </Box>
              )}
            </React.Fragment>
          );
        })}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            type={activeStep === transactionSteps.length ? "submit" : "button"}
          >
            {activeStep === transactionSteps.length - 1 ? "Confirm" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
}
