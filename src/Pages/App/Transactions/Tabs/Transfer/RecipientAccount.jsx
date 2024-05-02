import CustomTabs from "../../../../../Components/CustomTabs/CustomTabs";
import SavedRecipientTab from "./RegisteredRecipientTab";
import NewRecipientTab from "./NewRecipientTab";

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
