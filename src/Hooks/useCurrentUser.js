import { useGetUsers, useUser } from "../services/userServices";

export function useCurrentUser() {
  const { user } = useUser();
  const { data: users } = useGetUsers();
  const currentUser = users?.find((u) => u?.id === user?.id);

  return { currentUser };
}
