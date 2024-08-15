/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useGetUsers, useUser } from "../services/userServices";
// context apı for loan payment modal
const CurrentUserContext = createContext();
function CurrentUserProvider({ children }) {
  const { user } = useUser();
  const { data: users } = useGetUsers();

  const currentUser = users?.find((u) => u?.id === user?.id);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);
  if (context === undefined)
    throw new Error(
      "CurrentUserContext was used outside of CurrentUserProvider"
    );
  return context;
}
export { CurrentUserProvider, useCurrentUserContext };
