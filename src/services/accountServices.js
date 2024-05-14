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
