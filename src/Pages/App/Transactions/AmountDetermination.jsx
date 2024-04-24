import { Box, Grid, TextField } from "@mui/material";
import { formatCurrency } from "../../../utils/utils";
const GridStyle = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "transparent",
  color: "var(--color-text)",
  width: "100%",
  // padding: "1.5rem 2rem",
};
const BoxStyle = {
  width: "40%",
  border: "1px solid var(--color-border-2)",
  padding: "1.5rem 3rem",
  justifyContent: "space-between",
  display: "flex",
  borderRadius: "5px",
};
function AmountDetermination() {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        // component="button"
        sx={GridStyle}
      >
        <Box sx={BoxStyle}>
          <label>Kalan para transfer limiti:</label>
          <label>{formatCurrency(1000000000)}</label>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        // component="button"
        sx={GridStyle}
      >
        <Box sx={BoxStyle}>
          <label>Sık gönderilen miktar:</label>
          <label>{formatCurrency(500)}</label>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={GridStyle}
        // component="button"
      >
        <Box sx={{ ...BoxStyle, padding: "0", border: "none" }}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Gönderilecek miktar"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AmountDetermination;
