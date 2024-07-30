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

  // useEffect(
  //   function () {
  //     if (status === "New Recipient") {
  //       searchParams.set(
  //         "saveAsRegisteredWithIban",
  //         watchSaveAsRegisteredWithIban
  //       );
  //       setSearchParams(searchParams);
  //     }
  //     // else {
  //     //   searchParams.delete("saveAsRegisteredWithIban");
  //     //   setSearchParams(searchParams);
  //     // }
  //   },
  //   [watchSaveAsRegisteredWithIban, status, setSearchParams, searchParams]
  // );

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "1rem",
        }}
      >
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
          <CustomTextField
            id="recipientIban"
            label="Recipient Iban"
            defaultValue="TR"
            value={iban}
            onChange={(event) => handleChange(event)}
            register={{
              ...register("recipientIban", {}),
            }}
            inputProps={{ maxLength: maxIbanLength }}
            helperText={errors?.recipientIban?.message}
            error={errors?.recipientIban}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", gap: "1rem" }}>
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
          <Grid item xs={6}>
            <CustomTextField
              id="shortName"
              label="Short Name"
              register={{ ...register("shortName") }}
              helperText={errors?.shortName?.message}
              error={errors?.shortName}
            />
          </Grid>
        )}
        <Grid
          item
          xs={watchSaveAsRegisteredWithIban ? 6 : 12}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <FormControlLabel
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
