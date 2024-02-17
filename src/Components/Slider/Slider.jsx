import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
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

    const handleStepChange = step => {
        setActiveStep(step);
    };

    return (
        <Box
            sx={{
                maxWidth: "100%",
                flexGrow: 1,
                cursor: "pointer",
            }}
        >
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
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "3rem",
                                        color: "var(--color-secondary)",
                                        fontWeight: "900",
                                        letterSpacing: " 0.3rem",
                                        textAlign: "center",
                                    }}
                                >
                                    {homeTexts[activeStep].head}
                                </Typography>
                                <Typography
                                    sx={{
                                        width: "50%",
                                        fontSize: "1.2rem",
                                        color: "var(--color-text)",
                                        lineHeight: "2rem",
                                        textAlign: "center",
                                        mb: "2rem",
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
