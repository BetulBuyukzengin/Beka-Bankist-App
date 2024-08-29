/* eslint-disable react/prop-types */
import CustomTabs from "../../../../Components/CustomTabs/CustomTabs";
import UpdateEmailWithEmail from "./UpdateEmailTab/UpdateEmailWithEmail";
import UpdateEmailWithPhoneNumber from "./UpdateEmailTab/UpdateEmailWithPhoneNumber";

function UpdateEmailAdressForm({ setOpenUpdateEmailModal }) {
  return (
    <CustomTabs
      tabName="UpdateEmailAdressForm"
      content={[
        {
          label: "With Email",
          component: <UpdateEmailWithEmail setOpen={setOpenUpdateEmailModal} />,
        },
        {
          label: "With Phone Number",
          component: <UpdateEmailWithPhoneNumber />,
        },
      ]}
    />
  );
}

export default UpdateEmailAdressForm;
