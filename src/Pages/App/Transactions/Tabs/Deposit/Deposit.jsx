import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

function Deposit() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [searchParams] = useSearchParams();
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
        <CustomTextField
          width="short"
          id="depositMoney"
          label="Amount to be deposit"
          type="number"
          register={{
            ...register("amountToSend"),
          }}
          helperText={errors?.amountToSend?.message}
          error={errors?.amountToSend}
        />
      </Grid>
    </Grid>
  );
}

export default Deposit;
