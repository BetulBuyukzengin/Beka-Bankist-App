import { toast } from "react-toastify";
import { supabase } from "../Supabase/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getAccounts() {
  let { data, error } = await supabase.from("accounts").select("*");
  if (error) throw new Error(error);
  return data;
}
export function useGetAccounts() {
  const { data: accounts, isLoading } = useQuery({
    queryFn: () => getAccounts(),
    queryKey: ["accounts"],
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
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (data) => createAccount(data),
    onSuccess: () => {
      toast.success("Account created");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => toast.error("Account not created"),
  });
  return { mutateAsync, isLoading };
}

async function updateBalance(id, account) {
  const { data, error } = await supabase
    .from("accounts")
    .update(account)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export function useUpdateBalance() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ id, account }) => updateBalance(id, account),
    onError: () => toast.error("Balance updated"),
  });
  return { mutateAsync, isLoading };
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
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ id, account }) => updateDailyRemainingLimit(id, account),
    // onError: () => toast.error("Balance updated"),
  });
  return { mutateAsync, isLoading };
}
