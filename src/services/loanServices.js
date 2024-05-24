import { useMutation } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";
import { toast } from "react-toastify";

async function createLoan(newLoan) {
  const { data, error } = await supabase
    .from("loanRequest")
    .insert([newLoan])
    .select();
  if (error) console.error(error);
  console.log(data);
  return data;
}

export function useCreateLoan() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (loan) => createLoan(loan),
    onSuccess: () =>
      toast.success("Loan withdrawal request sent successfully!"),
    onError: () => toast.error("Loan withdrawal request could not be sent"),
  });
  return { mutateAsync, isLoading };
}
