import { Box, Grid } from "@mui/material";
import { formatCurrency } from "../../../utils/utils";

import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import { useState } from "react";
const GridStyle = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "transparent",
  color: "var(--color-text)",
};
const BoxStyle = {
  border: "1px solid var(--color-border-2)",
  borderRadius: "5px",
  padding: "1.5rem 3rem",
  width: "40%",
  justifyContent: "space-between",
  display: "flex",
};

const frequentlyAmount = Math.trunc(Math.random() * 1000000);

function AmountDetermination() {
  const [showFrequentlyAmount, setShowFrequentlyAmount] = useState();
  function handleClick() {
    setShowFrequentlyAmount(frequentlyAmount);
  }
  function handleChange(e) {
    setShowFrequentlyAmount(e.target.value);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={GridStyle}>
        <Box sx={BoxStyle}>
          <label>Remaining transfer limit:</label>
          <label>{formatCurrency(1000000000)}</label>
        </Box>
      </Grid>

      <Grid item xs={12} sx={GridStyle}>
        <Box sx={{ ...BoxStyle, cursor: "pointer" }} onClick={handleClick}>
          <label style={{ cursor: "pointer" }}>Frequently sent amount:</label>
          <label style={{ cursor: "pointer" }}>
            {formatCurrency(frequentlyAmount)}
          </label>
        </Box>
      </Grid>

      <Grid item xs={12} sx={GridStyle}>
        <Box sx={{ ...BoxStyle, padding: "0", border: "none" }}>
          <CustomTextField
            id="amountToSent"
            width="tall"
            label="Amount to sent"
            value={showFrequentlyAmount || ""}
            onChange={(e) => handleChange(e)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AmountDetermination;
