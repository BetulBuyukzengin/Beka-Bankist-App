import { useCurrentUser } from "./useCurrentUser";

export function useIsUserInformation() {
  const { currentUser } = useCurrentUser();
  const isInformationsCompleted =
    currentUser?.applicantAddress &&
    currentUser?.applicantPhoneNumber &&
    currentUser?.birthday &&
    currentUser?.identificationNumber;
  return { isInformationsCompleted };
}
