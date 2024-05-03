import { Grid } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";

export default function BusinessInformation() {
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
        <CustomTextField id="businessName" label="Business Name" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField id="sectorofWork" label="Sector of Work" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField id="job" label="Job" />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField type="number" id="income" label="Income" />
      </Grid>
    </Grid>
  );
}
