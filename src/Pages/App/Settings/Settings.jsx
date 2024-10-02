import { Grid } from "@mui/material";
import Loader from "../../../Components/Loader/Loader";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import DeleteAppAccount from "./DeleteAppAccount/DeleteAppAccount";
import PersonalInformationSettings from "./PersonalInformationSettings";
import UpdateEmail from "./UpdateEmail/UpdateEmail";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import { useIsUserInformation } from "../../../Hooks/useIsUserInformation";
import AddProfileImgForm from "./AddProfileImg/AddProfileImgForm";
import styled from "styled-components";

const StyledSettingsTitle = styled.h3`
  background-color: transparent;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 0;
  padding-top: 1rem;
  font-size: 1.5rem;
  width: 100%;
  @media (max-width: 48em) {
    font-size: 1.2rem;
  }
  @media (max-width: 31.25em) {
    font-size: 1rem;
  }
`;

function Settings() {
  const { currentUser } = useCurrentUser();
  const { isInformationsCompleted } = useIsUserInformation();
  if (!currentUser) return <Loader />;
  return (
    <Grid
      container
      gap={2}
      sx={{
        // alignItems: "center",
        flexDirection: "column",
        height: "max-content",
        textAlign: "center",
        placeContent: "center",
      }}
    >
      <Grid item xs={6}>
        <StyledSettingsTitle>SETTINGS</StyledSettingsTitle>
      </Grid>

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
