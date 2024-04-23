import CustomTabs from "./Tabs/CustomTabs";
import SavedRecipientTab from "./Tabs/RegisteredRecipientTab";
import NewRecipientTab from "./Tabs/NewRecipientTab";

const content = [
  {
    label: "Saved Recipients",
    component: <SavedRecipientTab />,
  },
  {
    label: "New Recipient",
    component: <NewRecipientTab />,
  },
];
function RecipientAccount() {
  return <CustomTabs content={content} />;
}

export default RecipientAccount;
