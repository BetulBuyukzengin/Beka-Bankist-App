import StepperComponent from "../../../../Components/StepperComponent/StepperComponent";
import BusinessInformation from "../Loan/BusinessInformation";
import CreditInformation from "../Loan/CreditInformation";
import FinancialInformation from "../Loan/FinancialInformation";
import PersonalInformation from "../Loan/PersonalInformation";

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
