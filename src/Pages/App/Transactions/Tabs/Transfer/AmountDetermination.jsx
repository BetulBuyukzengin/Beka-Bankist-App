import { Box, Grid } from "@mui/material";
import { formatCurrency } from "../../../../../utils/utils";

import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { findMostFrequent } from "../../../../../utils/utils.js";
import { useMovements } from "../../../../../services/movementsServices";

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

// const frequentlyAmount = 500;

function AmountDetermination() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [amountToSendValue, setAmountToSendValue] = useState(0);
  const [newRemainingLimit, setNewRemainingLimit] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAccRemainingBalance = JSON.parse(
    searchParams.get("selectedAccount")
  )?.balance;
  const selectedAccRemainingTransferLimit = JSON.parse(
    searchParams.get("selectedAccount")
  )?.remainingTransferLimit;
  const [remainingBalance, setRemainingBalance] = useState(
    selectedAccRemainingBalance
  );
  // findMostFrequent(array)
  const { movements, isLoading } = useMovements();
  const amountToSends = movements
    ?.filter((movement) => movement.status === "Transfer")
    ?.map((movement) => movement.amountToSend);
  // if (!amountToSends) return;
  // const frequentlyAmount = findMostFrequent(amountToSends);

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
      setNewRemainingLimit(
        selectedAccRemainingTransferLimit - amountToSendValue
      );
    },
    [amountToSendValue]
  );
  useEffect(
    function () {
      setRemainingBalance(selectedAccRemainingBalance - amountToSendValue);
    },
    [amountToSendValue]
  );
  useEffect(() => {
    if (searchParams.get("amount-to-send")) {
      setAmountToSendValue(searchParams.get("amount-to-send"));
    } else setValue("amountToSend", amountToSendValue);
  }, [amountToSendValue, setValue, searchParams]);

  const prevStatus = useRef(null);
  const currentStatus = searchParams.get("status");

  useEffect(
    function () {
      if (currentStatus !== prevStatus.current) {
        setAmountToSendValue(0);
      }
    },
    [currentStatus]
  );
  if (!amountToSends) return;
  let frequentlyAmount = findMostFrequent(amountToSends);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={GridStyle}>
        <Box sx={BoxStyle}>
          <label>Remaining transfer limit:</label>
          <label>
            {formatCurrency(
              newRemainingLimit || selectedAccRemainingTransferLimit
            )}
          </label>
        </Box>
      </Grid>
      <Grid item xs={12} sx={GridStyle}>
        <Box
          sx={{ ...BoxStyle, cursor: "pointer" }}
          // onClick={handleClickBalance}
        >
          <label style={{ cursor: "pointer" }}>Remaining balance: </label>
          <label style={{ cursor: "pointer" }}>
            {formatCurrency(remainingBalance)}
          </label>
        </Box>
      </Grid>
      <Grid item xs={12} sx={GridStyle}>
        <Box sx={{ ...BoxStyle, cursor: "pointer" }} onClick={handleClick}>
          <label style={{ cursor: "pointer" }}>Frequently sent amount: </label>
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
            helperText={errors?.amountToSend?.message}
            error={errors?.amountToSend}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AmountDetermination;
