import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import BusinessInformation from "./BusinessInformation";
import CreditInformation from "./CreditInformation";
import FinancialInformation from "./FinancialInformation";
import PersonalInformation from "./PersonalInformation";

const transactionSteps = [
  {
    label: "Personal Information",
    component: <PersonalInformation />,
  },
  {
    label: "Business Information",
    component: <BusinessInformation />,
  },
  {
    label: "Financial Information",
    component: <FinancialInformation />,
  },
  {
    label: "Credit Information",
    component: <CreditInformation />,
  },
];
function LoanTab() {
  return <StepperComponent transactionSteps={transactionSteps} />;
}

export default LoanTab;
