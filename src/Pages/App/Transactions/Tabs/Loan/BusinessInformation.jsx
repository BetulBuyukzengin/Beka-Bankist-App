import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { useFormContext } from "react-hook-form";

export default function BusinessInformation() {
  const { register, formState } = useFormContext();
  const { errors } = formState;

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
      <Grid
        item
        xs={12}
        sm={6}
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
          id="businessName"
          label="Business Name"
          register={{
            ...register("applicantBusinessName"),
          }}
          helperText={errors?.applicantBusinessName?.message}
          error={errors?.applicantBusinessName}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
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
          id="sectorofWork"
          label="Sector of Work"
          register={{
            ...register("applicantSectorOfWork"),
          }}
          helperText={errors?.applicantSectorOfWork?.message}
          error={errors?.applicantSectorOfWork}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
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
          id="job"
          label="Job"
          register={{
            ...register("applicantJob"),
          }}
          helperText={errors?.applicantJob?.message}
          error={errors?.applicantJob}
        />
      </Grid>
    </Grid>
  );
}
