/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import CustomRadio from "../../../../../Components/CustomRadio/CustomRadio";

const StyledBox = styled(Box)`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  cursor: pointer;
`;

function SenderAccount() {
  const { register } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledBox>
          <CustomRadio register={{ ...register("selectedAccount") }} />
        </StyledBox>
      </Grid>
    </Grid>
  );
}

export default SenderAccount;