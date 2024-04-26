import RecipientAccount from "../RecipientAccount";
import DetailDetermination from "../DetailDetermination";
import AmountDetermination from "../AmountDetermination";
import SenderAccount from "../SenderAccount";
import StepperComponent from "../../../../Components/StepperComponent/StepperComponent";

const transactionSteps = [
  {
    label: "Recipient Account",
    component: <RecipientAccount />,
  },
  {
    label: "Sender Account",
    component: <SenderAccount />,
  },
  {
    label: "Amount Determination",
    component: <AmountDetermination />,
  },
  {
    label: "Detail Determination",
    component: <DetailDetermination />,
  },
];
export default function TransferMoneyTab() {
  return <StepperComponent transactionSteps={transactionSteps} />;
}
