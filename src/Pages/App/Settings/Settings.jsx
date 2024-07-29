import { FilledInput, Grid } from "@mui/material";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import { FormProvider, useForm } from "react-hook-form";
import CustomButton from "../../../Components/CustomButton/CustomButton";
function Settings() {
  const methods = useForm();

  const onSubmit = async (data) => {
  };
  const { register } = methods;
  // if (isloading) return <Loader />;
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={6}>
            <CustomTextField
              id="userName"
              label="User Name"
              //   value={}
              register={{
                ...register("userName"),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomButton type="submit" buttonText="create" />
          </Grid>
          <Grid>
            <FilledInput
              id="profile"
              accept="image/*"
              // disabled={isUpdating}
              // onChange={(e) => setAvatar(e.target.files[0])}
            />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}

export default Settings;
