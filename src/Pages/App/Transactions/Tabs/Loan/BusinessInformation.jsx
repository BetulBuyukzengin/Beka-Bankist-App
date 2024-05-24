import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";

export default function BusinessInformation() {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  //! register ve required ekledim ama 2.stepe gcınce hata veriyor
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        paddingBottom: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Grid item xs={6}>
        <CustomTextField
          id="businessName"
          label="Business Name"
          register={{
            ...register("applicantBusinessName", {
              required: "Th,s field is required!",
            }),
          }}
          helperText={errors?.applicantBusinessName?.message}
          error={errors?.applicantBusinessName}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="sectorofWork"
          label="Sector of Work"
          register={{
            ...register("applicantSectorOfWork", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantSectorOfWork?.message}
          error={errors?.applicantSectorOfWork}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          id="job"
          label="Job"
          register={{
            ...register("applicantJob", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantJob?.message}
          error={errors?.applicantJob}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          type="number"
          id="income"
          label="Income"
          register={{
            ...register("applicantIncome", {
              required: "This field is required!",
            }),
          }}
          helperText={errors?.applicantIncome?.message}
          error={errors?.applicantIncome}
        />
      </Grid>
    </Grid>
  );
}
