import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { useIsUserInformation } from "../../../Hooks/useIsUserInformation";
import { useGetAccounts } from "../../../services/accountServices";
import BankAccountCreate from "./BankAccountCreate";
import CurrentAccounts from "./CurrentAccounts";

function Account() {
  const { accounts, isLoading } = useGetAccounts();
  // const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { isInformationsCompleted } = useIsUserInformation();
  useEffect(() => {
    if (!isInformationsCompleted) {
      navigate("/applayout/settings", { replace: true });
    }
  }, []);

  if (isLoading) return <Loader />;
  return (
    <>
      {accounts?.length > 0 && !isLoading && <CurrentAccounts />}
      {accounts?.length == 0 && !isLoading && <BankAccountCreate />}
    </>
  );
}

export default Account;
