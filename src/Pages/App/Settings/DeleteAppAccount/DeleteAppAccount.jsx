import { useState } from "react";
import CustomSettingsContent from "../../../../Components/CustomSettingsContent/CustomSettingsContent";
import DeleteAppAccountForm from "./DeleteAppAccountForm";

function DeleteAppAccount() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <CustomSettingsContent
      title="Delete your account"
      buttonText="Delete Account"
      FormComponent={DeleteAppAccountForm}
      formProps={{ setOpenModal, openModal }}
    />
  );
}
export default DeleteAppAccount;
