import RecipientAccount from "./RecipientAccount";
import DetailDetermination from "./DetailDetermination";
import AmountDetermination from "./AmountDetermination";
import SenderAccount from "./SenderAccount";
import StepperComponent from "../../../../../Components/StepperComponent/StepperComponent";
import TransactionControl from "./TransactionControl";

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
  {
    label: "Transaction Control",
    component: <TransactionControl />,
  },
];
export default function TransferMoneyTab() {
  return <StepperComponent transactionSteps={transactionSteps} />;
}
