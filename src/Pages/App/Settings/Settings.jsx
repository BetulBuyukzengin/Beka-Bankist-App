import { Grid } from "@mui/material";
import Loader from "../../../Components/Loader/Loader";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import DeleteAppAccount from "./DeleteAppAccount/DeleteAppAccount";
import PersonalInformationSettings from "./PersonalInformationSettings";
import UpdateEmail from "./UpdateEmail/UpdateEmail";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import { useIsUserInformation } from "../../../Hooks/useIsUserInformation";
import AddProfileImgForm from "./AddProfileImg/AddProfileImgForm";

function Settings() {
  const { currentUser } = useCurrentUser();
  const { isInformationsCompleted } = useIsUserInformation();
  if (!currentUser) return <Loader />;
  return (
    <Grid
      container
      gap={2}
      sx={{ justifyContent: "center", textAlign: "center" }}
    >
      <Grid item xs={6}>
        <PersonalInformationSettings
          isPersonalDatas={isInformationsCompleted}
        />
      </Grid>
      {isInformationsCompleted && (
        <>
          <Grid item xs={6}>
            <UpdateEmail />
          </Grid>
          <Grid item xs={6}>
            <UpdatePassword />
          </Grid>
          <Grid item xs={6}>
            <DeleteAppAccount />
          </Grid>
          <Grid item xs={6}>
            <AddProfileImgForm />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Settings;
