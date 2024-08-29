import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";

async function createRegisteredRecipient(newRecipient) {
  const { data, error } = await supabase
    .from("registeredRecipients")
    .insert([newRecipient])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export function useCreateRegisteredRecipient() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => createRegisteredRecipient(data),
  });
  return { mutateAsync, isLoading };
}

async function getRegisteredRecipients() {
  let { data, error } = await supabase.from("registeredRecipients").select("*");

  // .select({ isRegisteredIban, isRegisteredAccount });
  if (error) throw new Error(error.message);
  return data;
}
export function useGetRegisteredRecipients() {
  const { data, isLoading } = useQuery({
    queryFn: getRegisteredRecipients,
    queryKey: ["registered"],
  });
  return { data, isLoading };
}
