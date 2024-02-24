/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grow from "@mui/material/Grow";

function CustomAccordion({ index, expanded, handleChange, question, content }) {
    return (
        <Accordion
            sx={{
                width: "100%",
                minHeight: "3.5rem",
                backgroundColor: "var(--color-background)",
                pt: "0.5rem",
            }}
            expanded={expanded === index}
            onChange={handleChange(index)}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon sx={{ color: "var(--color-text)" }} />
                }
                aria-controls={`${index}-content`}
                id={`${index}-header`}
            >
                <Typography
                    sx={{
                        width: "maxContent",
                        flexShrink: 0,
                        fontWeight: "bold",
                        color: "var(--color-text)",
                    }}
                >
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grow in={expanded} timeout={500}>
                    <Typography
                        sx={{ color: "var(--color-text)", opacity: 0.7 }}
                    >
                        {content}
                    </Typography>
                </Grow>
            </AccordionDetails>
        </Accordion>
    );
}

export default CustomAccordion;
