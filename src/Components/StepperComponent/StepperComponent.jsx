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
import styled from "styled-components";

const StyledButton = styled(Button)`
  @media (max-width: 48em) {
    font-size: 0.7rem !important;
  }
`;
export default function StepperComponent({
  transactionSteps,
  activeStep,
  setActiveStep,
}) {
  const { trigger } = useFormContext();
  const handleNext = async () => {
    const result = await trigger();
    if (result) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { isLoading } = useCreateLoan();
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          paddingTop: "1rem",
          "@media (max-width:48em)": {
            display: "none",
          },
        }}
      >
        {transactionSteps.map((label, index) => {
          return (
            <Step
              key={index}
              sx={{
                "@media (max-width:48em)": {
                  display: "none",
                },
              }}
            >
              <StepLabel
                sx={{
                  "& > span > svg > text": {
                    fill: "var(--color-background)!important",
                    "@media (max-width:48em)": {
                      fontSize: ".7rem!important",
                    },
                    "@media (max-width:31.25em)": {
                      fontSize: ".6rem!important",
                    },
                  },
                  // "& > span > svg > circle": {
                  //   cx: "10px",
                  //   cy: "10px",
                  //   r: 10,
                  // },
                  "& > .MuiStepLabel-labelContainer>span": {
                    color: "var(--color-text)",
                    "@media (max-width:48em)": {
                      fontSize: ".7rem!important",
                    },
                    "@media (max-width:31.25em)": {
                      fontSize: ".6rem!important",
                    },
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
                    overflowY: "auto",
                    "@media (max-width:48em)": {
                      paddingTop: ".5rem",
                      overflow: "hidden",
                    },
                  }}
                >
                  <Box>{transaction.component}</Box>
                </Box>
              )}
            </React.Fragment>
          );
        })}
        {!isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <StyledButton
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              // sx={{ mr: 1 }}
            >
              Back
            </StyledButton>
            {activeStep !== transactionSteps.length - 1 && (
              <StyledButton
                type="button"
                onClick={handleNext}
                // type={
                //   activeStep === transactionSteps.length ? "submit" : "button"
                // }
              >
                Next
              </StyledButton>
            )}
            {(activeStep === transactionSteps.length - 1 ||
              activeStep === transactionSteps.length) && (
              <StyledButton type="submit" onClick={handleNext}>
                Confirm
              </StyledButton>
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
