import Loader from "../../../Components/Loader/Loader";
import { useGetAccounts } from "../../../services/accountServices";
import BankAccountCreate from "./BankAccountCreate";
import CurrentAccounts from "./CurrentAccounts";

function Account() {
  const { accounts, isLoading } = useGetAccounts();
  if (isLoading) return <Loader />;
  return (
    <>{accounts.length > 0 ? <CurrentAccounts /> : <BankAccountCreate />}</>
  );
}

export default Account;
