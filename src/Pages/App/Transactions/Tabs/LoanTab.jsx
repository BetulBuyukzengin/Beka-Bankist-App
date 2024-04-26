import StepperComponent from "../../../../Components/StepperComponent/StepperComponent";
import BusinessInformation from "../Loan/BusinessInformation";
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
  // {
  //   label: "Amount Determination",
  //   component: <AmountDetermination />,
  // },
  // {
  //   label: "Detail Determination",
  //   component: <DetailDetermination />,
  // },
];
function LoanTab() {
  return <StepperComponent transactionSteps={transactionSteps} />;
}

export default LoanTab;
