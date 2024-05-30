/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";
import { useCreateLoan } from "../../services/loanServices";
import Loader from "../Loader/Loader";

export default function StepperComponent({
  transactionSteps,
  activeStep,
  setActiveStep,
}) {
  const { trigger } = useFormContext();
  const handleNext = async () => {
    const result = await trigger();
    console.log("result", result);
    if (result) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { isLoading } = useCreateLoan();
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ paddingTop: "1rem" }}>
        {transactionSteps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel
                sx={{
                  "& > span > svg > text": {
                    fill: "var(--color-background)!important",
                  },
                }}
              >
                {label.label}
              </StepLabel>
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
                    paddingTop: "2rem",
                    marginBottom: "auto",
                    height: "auto",
                    overflowY: "auto",
                  }}
                >
                  <Box>{transaction.component}</Box>
                </Box>
              )}
            </React.Fragment>
          );
        })}
        {/*! loan işşlemi yapldıktan sonra btonlar  kaldırılacak,
        son stepi göstermek istemezsen navıgate ıle yonlendır sfngkdsfnf programmatic navitaion yap yanı submıtten sonra olur bu cocugummm  */}
        {!isLoading ? (
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
            {activeStep !== transactionSteps.length - 1 && (
              <Button
                type="button"
                onClick={handleNext}
                // type={
                //   activeStep === transactionSteps.length ? "submit" : "button"
                // }
              >
                Next
              </Button>
            )}
            {(activeStep === transactionSteps.length - 1 ||
              activeStep === transactionSteps.length) && (
              <Button type="submit" onClick={handleNext}>
                Confirm
              </Button>
            )}
          </Box>
        ) : (
          <Loader />
        )}
        {/* )} */}
      </React.Fragment>
    </Box>
  );
}
