/* eslint-disable react/prop-types */
import { NavigateNext } from "@mui/icons-material";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledH6 = styled.h6`
  text-align: start;
`;
const StyledTitleLabel = styled.label`
  margin-right: 0.5rem;
`;
const StyledValueLabel = styled.label``;

const StyledAccountCheckComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7% 9%;
  border: 1px solid var(--color-border-2);
`;
const StyledBox = styled(Box)`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  cursor: pointer;
`;
function AccountCheckComp() {
  return (
    <StyledAccountCheckComponent>
      <div>
        <StyledH6>Meram-500</StyledH6>
        <StyledTitleLabel>Kullanılabilir bakiye:</StyledTitleLabel>
        <StyledValueLabel>500</StyledValueLabel>
      </div>
      <div>
        <NavigateNext />
      </div>
    </StyledAccountCheckComponent>
  );
}

function SenderAccount() {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              sx={{ marginLeft: "0", marginRight: "0" }}
              control={
                <Radio
                  sx={{
                    // opacity: "0",
                    height: "20%",
                    width: "21.5%",
                    position: "absolute",
                    borderRadius: "0px",
                    "&+span": {
                      width: "17rem",
                    },
                  }}
                />
              }
              value="AccountCheckComp"
              label={<AccountCheckComp />}
            />
          </RadioGroup>
        </StyledBox>
      </Grid>
    </Grid>
  );
}

export default SenderAccount;
