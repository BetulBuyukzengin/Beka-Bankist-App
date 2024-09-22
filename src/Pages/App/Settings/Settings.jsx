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
    font-size: 0.9rem;
  }
  @media (max-width: 31.25em) {
    font-size: 0.8rem;
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
      sx={{ justifyContent: "center", textAlign: "center" }}
    >
      <Grid item xs={6}>
        <StyledSettingsTitle>SETTINGS</StyledSettingsTitle>
      </Grid>

      <Grid item xs={12} sm={6}>
        <PersonalInformationSettings
          isPersonalDatas={isInformationsCompleted}
        />
      </Grid>
      {isInformationsCompleted && (
        <>
          <Grid item xs={12} sm={6}>
            <UpdateEmail />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UpdatePassword />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DeleteAppAccount />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AddProfileImgForm />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Settings;
