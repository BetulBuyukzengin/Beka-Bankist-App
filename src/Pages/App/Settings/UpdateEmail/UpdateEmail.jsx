import { useState } from "react";
import CustomSettingsContent from "../../../../Components/CustomSettingsContent/CustomSettingsContent";
import UpdateEmailAdressForm from "./UpdateEmailAdressForm";

function UpdateEmail() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <CustomSettingsContent
      title="Update email address by confirming from existing email"
      buttonText="Update Email"
      FormComponent={UpdateEmailAdressForm}
      formProps={{ setOpenModal, openModal }}
    />
  );
}

export default UpdateEmail;
