import { supabase } from "../Supabase/supabase";
import { useQuery } from "@tanstack/react-query";

export async function getAccounts() {
  let { data: accounts, error } = await supabase.from("accounts").select("*");
  if (error) throw new Error(error);
  return accounts;
}
export function useAccounts() {
  const { data: accounts, isLoading } = useQuery({
    queryFn: () => getAccounts(),
    queryKey: ["accounts"],
  });
  return {
    isLoading,
    accounts,
  };
}
