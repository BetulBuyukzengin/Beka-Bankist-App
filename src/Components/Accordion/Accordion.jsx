/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grow from "@mui/material/Grow";
import PropTypes from "prop-types";
import {
  media31_25em,
  media48em,
  media84_37em,
} from "../../Constants/constants";

CustomAccordion.propTypes = {
  index: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function CustomAccordion({ index, expanded, handleChange, question, content }) {
  return (
    <Accordion
      sx={{
        width: "100%",
        minHeight: "3.5rem",
        backgroundColor: "transparent",
        pt: "0.5rem",
      }}
      expanded={expanded === index}
      onChange={handleChange(index)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "var(--color-text)" }} />}
        aria-controls={`${index}-content`}
        id={`${index}-header`}
      >
        <Typography
          sx={{
            width: "maxContent",
            flexShrink: 0,
            fontWeight: "bold",
            color: "var(--color-text)",
            [media48em]: {
              fontSize: ".8rem",
            },
            [media31_25em]: {
              fontSize: ".7rem",
            },
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grow in={Boolean(expanded)} timeout={500}>
          <Typography
            sx={{
              color: "var(--color-text)",
              opacity: 0.7,
              [media84_37em]: {
                fontSize: ".9rem",
              },
              [media48em]: {
                fontSize: ".8rem",
              },
              [media31_25em]: {
                fontSize: ".7rem",
              },
            }}
          >
            {content}
          </Typography>
        </Grow>
      </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;
