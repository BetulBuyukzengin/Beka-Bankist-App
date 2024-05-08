import CustomTabs from "../../../../../Components/CustomTabs/CustomTabs";
import NewRecipientTab from "./NewRecipientTab";
import RegisteredRecipientsTab from "./RegisteredRecipientsTab";

const content = [
  {
    label: "Registered Recipients",
    component: <RegisteredRecipientsTab />,
  },
  {
    label: "New Recipient",
    component: <NewRecipientTab />,
  },
];
function RecipientAccount() {
  return <CustomTabs tabName="recipientAccountTab" content={content} />;
}

export default RecipientAccount;
