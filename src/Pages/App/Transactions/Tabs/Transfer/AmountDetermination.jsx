import { Box, Grid } from "@mui/material";
import { formatCurrency } from "../../../../../utils/utils";

import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
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

const frequentlyAmount = 500;
const remainingLimit = 1000000000;

function AmountDetermination() {
  const { register, setValue, watch } = useForm();
  const [newRemainingLimit, setNewRemainingLimit] = useState();

  // const [showFrequentlyAmount, setShowFrequentlyAmount] = useState();
  // const [showRemainingLimit, setShowRemainingLimit] = useState(remainingLimit);
  const watchAmountToSend = watch("amountToSend");
  console.log(watchAmountToSend);

  function handleClick() {
    setValue("amountToSend", frequentlyAmount);
  }

  useEffect(
    function () {
      setNewRemainingLimit(remainingLimit - watchAmountToSend);
    },
    [watchAmountToSend]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={GridStyle}>
        <Box sx={BoxStyle}>
          <label>Remaining transfer limit:</label>
          <label>{formatCurrency(newRemainingLimit || remainingLimit)}</label>
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
            id="amountToSend"
            width="tall"
            label="Amount to send"
            // value={showFrequentlyAmount || ""}
            // onChange={(e) => handleChange(e)}
            // disabled={showRemainingLimit <= 0}
            register={{ ...register("amountToSend") }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AmountDetermination;
