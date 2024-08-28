import { toast } from "react-toastify";
import { supabase } from "../Supabase/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./userServices";

async function getAccounts() {
  let { data, error } = await supabase.from("accounts").select("*");
  if (error) throw new Error(error);
  return data;
}

export function useGetAccounts() {
  const { user } = useUser();
  const { data: accounts, isLoading } = useQuery({
    queryFn: getAccounts,
    queryKey: ["accounts", user?.user_metadata?.fullName],
  });
  return {
    isLoading,
    accounts,
  };
}
async function createAccount(newAccount) {
  const { data, error } = await supabase
    .from("accounts")
    .insert([newAccount])
    .select();
  if (error) throw new Error(error);

  return data;
}
export function useCreateAccount() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data) => createAccount(data),
    onSuccess: () => {
      toast.success("Account created");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => {
      toast.error(
        "An error occured during creating account. Please try again!"
      );
    },
  });
  return { mutateAsync, isPending };
}

// async function updateBalance(id, account) {
async function updateAccount(id, account) {
  const { data, error } = await supabase
    .from("accounts")
    .update(account)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// export function useUpdateBalance() {
//   const { mutateAsync, isLoading } = useMutation({
//     mutationFn: ({ id, account }) => updateBalance(id, account),
//     onError: () => toast.error("Transaction could not be performed"),
//   });
//   return { mutateAsync, isLoading };
// }
export function useUpdateAccount() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ id, account }) => updateAccount(id, account),

    onError: () => toast.error("Transaction could not be performed"),
  });
  return { mutateAsync, isLoading };
}
async function deleteAccount(id) {
  const { error } = await supabase.from("accounts").delete().eq("id", id);
  if (error) throw new Error(error);
}
export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries("accounts");
      toast.success("Account successfully deleted!");
    },
    onError: () =>
      toast.error(
        "An error occurred during deleting account, please try again later!"
      ),
  });
  return { mutateAsync, isPending };
}
async function updateDailyRemainingLimit(id, account) {
  const { data, error } = await supabase
    .from("accounts")
    .update(account)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export function useDailyRemainingLimit() {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ id, account }) => updateDailyRemainingLimit(id, account),
    onSuccess: queryClient.invalidateQueries(),
  });
  return { mutateAsync, isLoading };
}
