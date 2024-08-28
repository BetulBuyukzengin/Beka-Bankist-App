// /* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import CustomRadio from "../../../../../Components/CustomRadio/CustomRadio";
import { useSearchParams } from "react-router-dom";

const StyledBox = styled(Box)`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  cursor: pointer;
`;

function SelectAccount({ border, monthlyPayment }) {
  const { register } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value) {
    searchParams.set("selectedAccount", value);
    setSearchParams(searchParams);
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledBox>
          <CustomRadio
            border={border}
            value={searchParams.get("selectedAccount")}
            monthlyPayment={monthlyPayment}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            register={{ ...register("selectedAccount") }}
          />
        </StyledBox>
      </Grid>
    </Grid>
  );
}
export default SelectAccount;
