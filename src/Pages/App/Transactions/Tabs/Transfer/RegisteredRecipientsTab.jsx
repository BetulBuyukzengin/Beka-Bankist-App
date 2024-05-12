import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

const GridStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  cursor: "pointer",
  "&:first-of-type": {
    marginTop: "1rem",
  },
};
const BoxStyle = {
  border: "1px solid var(--color-border-2)",
  borderRadius: "5px",
  padding: "1rem 3rem",
  width: "40%",
  justifyContent: "center",
  display: "flex",
};
function RegisteredRecipientsTab() {
  const { getValues } = useFormContext();
  const { shortName } = getValues();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        color: "var(--color-text)",
      }}
    >
      <Grid item xs={6} sx={GridStyle}>
        <Box sx={BoxStyle}>
          <label style={{ cursor: "pointer" }}>{shortName}</label>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisteredRecipientsTab;
