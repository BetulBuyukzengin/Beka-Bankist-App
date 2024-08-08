import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";
import { toast } from "react-toastify";
import { useUser } from "./userServices";

async function createLoan(newLoan) {
  const { data, error } = await supabase
    .from("loanRequest")
    .insert([newLoan])
    .select();
  if (error) throw new Error(error.message);
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

async function getLoan() {
  let { data, error } = await supabase.from("loanRequest").select("*");
  if (error) throw new Error(error.message);
  return data;
}
export function useGetLoan() {
  const { user } = useUser();
  const { data, isLoading, refetch } = useQuery({
    queryFn: getLoan,
    queryKey: ["loan", user?.user_metadata?.fullName],
  });
  return { isLoading, data, refetch };
}

async function updateLoanMonthlyPayment({ monthlyPayment, id, updateColumn }) {
  const { data, error } = await supabase
    .from("loanRequest")
    .update({ [updateColumn]: monthlyPayment })
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export function useUpdateLoanMonthlyPayment() {
  const query = useQueryClient();
  const { isLoading, mutateAsync, isPending } = useMutation({
    mutationFn: updateLoanMonthlyPayment,
    onSuccess: () => {
      query.invalidateQueries(["loan"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, mutateAsync, isPending };
}
