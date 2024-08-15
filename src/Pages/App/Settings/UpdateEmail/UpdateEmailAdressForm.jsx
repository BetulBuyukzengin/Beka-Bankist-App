/* eslint-disable react/prop-types */
import CustomTabs from "../../../../Components/CustomTabs/CustomTabs";
import UpdateEmailWithEmail from "./UpdateEmailTab/UpdateEmailWithEmail";
import UpdateEmailWithPhoneNumber from "./UpdateEmailTab/UpdateEmailWithPhoneNumber";

// const content = [
//   {
//     label: "With Email",
//     component: <UpdateEmailWithEmail />,
//   },
//   { label: "With Phone Number", component: <UpdateEmailWithPhoneNumber /> },
// ];

function UpdateEmailAdressForm({ setOpenUpdateEmailModal }) {
  // const mainTabLabel = content.map((tab) => {
  //   return tab.label;
  // });
  return (
    <CustomTabs
      tabName="UpdateEmailAdressForm"
      // mainTabLabel={mainTabLabel}
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
