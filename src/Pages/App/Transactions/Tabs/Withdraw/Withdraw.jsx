import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  width: 50%;
  &:hover > div > fieldset {
    border-color: var(--color-gray) !important;
  }
  & > label {
    color: var(--color-text) !important;
    @media (max-width: 48em) {
      font-size: 0.9rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.8rem;
    }
  }
  & > div {
    color: var(--color-text);
    & > fieldset {
      border-color: var(--color-border-2);
    }
  }
  & div > input {
    &:disabled {
      -webkit-text-fill-color: var(--color-text) !important;
      color: var(--color-text) !important;
    }
    &:disabled + fieldset {
      border-color: var(--color-border-2) !important;
      background-color: var(--color-background-3);
    }
    @media (max-width: 48em) {
      font-size: 1rem;
    }
    @media (max-width: 31.25em) {
      font-size: 0.9rem;
    }
  }
`;

function Withdraw() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container sx={{ padding: "1rem" }}>
      <Grid
        item
        xs={12}
        sx={{
          "&>div": {
            "@media (max-width:48em)": {
              width: "100%!important",
            },
            "&>p": {
              "@media (max-width:48em)": {
                fontSize: ".7rem",
              },
              "@media (max-width:31.25em)": {
                fontSize: ".6rem",
              },
            },
          },
        }}
      >
        <StyledTextField
          type="number"
          id="loadMoney"
          label="Amount to withdraw"
          {...register("amountToSend")}
          helperText={errors?.amountToSend?.message}
          error={errors?.amountToSend}
        />
      </Grid>
    </Grid>
  );
}

export default Withdraw;
