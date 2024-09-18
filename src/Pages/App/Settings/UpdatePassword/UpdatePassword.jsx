import { useState } from "react";
import CustomSettingsContent from "../../../../Components/CustomSettingsContent/CustomSettingsContent";
import UpdatePasswordForm from "./UpdatePasswordForm";

function UpdatePassword() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <CustomSettingsContent
      title="Update your password"
      buttonText="Update Password"
      FormComponent={UpdatePasswordForm}
      formProps={{ setOpenModal, openModal }}
    />
  );
}

export default UpdatePassword;
