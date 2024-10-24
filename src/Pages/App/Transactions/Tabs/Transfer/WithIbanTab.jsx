import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { maxIbanLength } from "../../../../../Constants/constants";
import { formatIBAN } from "../../../../../utils/utils";

function WithIbanTab({ iban, setIban }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchSaveAsRegisteredWithIban = watch("saveAsRegisteredWithIban");
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");

  const handleChange = (event) => {
    const formattedIban = formatIBAN(event.target.value);
    setIban(formattedIban);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "1rem",
          "@media (max-width:48em)": {
            flexDirection: "column",
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            gap: "1rem",
            "@media(max-width:48em)": {
              "&>div": {
                width: "100%!important",
              },
            },
          }}
        >
          <CustomTextField
            id="recipientIban"
            label="Recipient Iban"
            defaultValue="TR"
            value={iban}
            onChange={(event) => handleChange(event)}
            register={{
              ...register("recipientIban"),
            }}
            inputProps={{ maxLength: maxIbanLength }}
            helperText={errors?.recipientIban?.message}
            error={errors?.recipientIban}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            gap: "1rem",
            "@media(max-width:48em)": {
              "&>div": {
                width: "100%!important",
              },
            },
          }}
        >
          <CustomTextField
            id="recipientFullName"
            label="Recipient Full Name"
            register={{
              ...register("recipientFullNameWithIban"),
            }}
            helperText={errors?.recipientFullNameWithIban?.message}
            error={errors?.recipientFullNameWithIban}
          />
        </Grid>

        {watchSaveAsRegisteredWithIban && (
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              "@media(max-width:48em)": {
                "&>div": {
                  width: "100%!important",
                },
              },
            }}
          >
            <CustomTextField
              id="shortName"
              label="Short Name"
              register={{ ...register("shortName") }}
              helperText={errors?.shortName?.message}
              error={errors?.shortName}
            />
          </Grid>
        )}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <FormControlLabel
            sx={{
              "&> span:last-child": {
                "@media (max-width:48em)": {
                  fontSize: ".7rem",
                },
                "@media (max-width:31.25em)": {
                  fontSize: ".6rem",
                },
              },
            }}
            control={<Switch />}
            label="Add as registered recipient"
            {...register("saveAsRegisteredWithIban")}
            helperText={errors?.saveAsRegisteredWithIban?.message}
            error={errors?.saveAsRegisteredWithIban}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default WithIbanTab;
