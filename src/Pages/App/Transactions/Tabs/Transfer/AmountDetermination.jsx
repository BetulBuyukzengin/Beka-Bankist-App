import { Box, Grid } from "@mui/material";
import { formatCurrency } from "../../../../../utils/utils";

import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

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
  const { register, setValue } = useFormContext();
  const [amountToSendValue, setAmountToSendValue] = useState("");
  const [newRemainingLimit, setNewRemainingLimit] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    setAmountToSendValue(frequentlyAmount);
    setValue("amountToSend", frequentlyAmount);

    //! Keep values between steps
    searchParams.set("amount-to-send", frequentlyAmount);
    setSearchParams(searchParams);
  }

  function handleAmountChange(value) {
    setAmountToSendValue(value);
    searchParams.set("amount-to-send", value);
    setSearchParams(searchParams);
  }

  useEffect(
    function () {
      setNewRemainingLimit(remainingLimit - amountToSendValue);
    },
    [amountToSendValue]
  );

  useEffect(() => {
    if (searchParams.get("amount-to-send")) {
      setAmountToSendValue(searchParams.get("amount-to-send"));
    } else setValue("amountToSend", amountToSendValue);
  }, [amountToSendValue, setValue, searchParams]);

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
            value={amountToSendValue}
            onChange={(e) => handleAmountChange(e.target.value)}
            register={{ ...register("amountToSend") }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AmountDetermination;
