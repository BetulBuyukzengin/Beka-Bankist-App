import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipientAccount from "../RecipientAccount";
import DetailDetermination from "../DetailDetermination";
import AmountDetermination from "../AmountDetermination";
import SenderAccount from "../SenderAccount";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
  "Create an ad",
];

export default function TransferMoneyTab() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const transactionSteps = [
    {
      label: "Recipient Account",
      component: <RecipientAccount />,
    },
    {
      label: "Sender Account",
      component: <SenderAccount />,
    },
    {
      label: "Amount Determination",
      component: <AmountDetermination />,
    },
    {
      label: "Detail Determination",
      component: <DetailDetermination />,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {transactionSteps.map((transaction, index) => (
          <>
            {index === activeStep && (
              <Box sx={{ height: "22rem" }}>
                <Typography key={index} sx={{ mt: 2, mb: 1 }}>
                  {transaction.label}
                </Typography>
                <Box>{transaction.component}</Box>
              </Box>
            )}
          </>
        ))}
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
          {/* <Box sx={{ flex: "1 1 auto" }} /> */}
          {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
}
