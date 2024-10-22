import { Box, Grid } from "@mui/material";
import { formatCurrency } from "../../../../../utils/utils";

import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { findMostFrequent } from "../../../../../utils/utils.js";
import { useMovements } from "../../../../../services/movementsServices";
import styled from "styled-components";

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
  "@media (max-width:48em)": {
    width: "80%",
    padding: ".8rem 1rem",
  },
};
const StyledLabel = styled.label`
  @media (max-width: 48em) {
    font-size: 0.7rem;
  }
`;

function AmountDetermination() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [amountToSendValue, setAmountToSendValue] = useState("");
  // const [amountToSendValue, setAmountToSendValue] = useState(0);

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
  const { movements } = useMovements();
  const amountToSends = movements
    ?.filter((movement) => movement.status === "Transfer")
    ?.map((movement) => movement.amountToSend);

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
        setAmountToSendValue("");
        // setAmountToSendValue(0);
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
          <StyledLabel>Remaining transfer limit:</StyledLabel>
          <StyledLabel>
            {formatCurrency(
              newRemainingLimit || selectedAccRemainingTransferLimit
            )}
          </StyledLabel>
        </Box>
      </Grid>
      <Grid item xs={12} sx={GridStyle}>
        <Box sx={BoxStyle}>
          <StyledLabel>Remaining balance: </StyledLabel>
          <StyledLabel>{formatCurrency(remainingBalance)}</StyledLabel>
        </Box>
      </Grid>
      <Grid item xs={12} sx={GridStyle}>
        <Box sx={{ ...BoxStyle, cursor: "pointer" }} onClick={handleClick}>
          <StyledLabel style={{ cursor: "pointer" }}>
            Frequently sent amount:
          </StyledLabel>
          <StyledLabel style={{ cursor: "pointer" }}>
            {formatCurrency(frequentlyAmount)}
          </StyledLabel>
        </Box>
      </Grid>
      <Grid item xs={12} sx={GridStyle}>
        <Box
          sx={{
            ...BoxStyle,
            padding: "0",
            border: "none",
            "@media (max-width:48em)": {
              padding: "0!important",
              width: "80%",
            },
            "&>div>p": {
              "@media (max-width:48em)": {
                fontSize: ".7rem",
              },
              "@media (max-width:31.25em)": {
                fontSize: ".6rem",
              },
            },
          }}
        >
          <CustomTextField
            id="amountToSend"
            textFieldStyles={{ width: "100%", padding: 0 }}
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
