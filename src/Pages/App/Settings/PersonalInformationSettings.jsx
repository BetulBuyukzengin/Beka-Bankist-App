/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomSettingsContent from "../../../Components/CustomSettingsContent/CustomSettingsContent";
import UpdatePersonalInformationForm from "../Settings/UpdatePersonalInformation/UpdatePersonalInformationForm";
function PersonalInformationSettings({ isPersonalDatas }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <CustomSettingsContent
      title="Update personal information to use Beka Bankist"
      buttonText={isPersonalDatas ? "Update User" : "Add Personal Info"}
      FormComponent={UpdatePersonalInformationForm}
      formProps={{ isPersonalDatas, setOpenModal, openModal }}
    />
  );
}

export default PersonalInformationSettings;
