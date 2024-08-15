import { useMutation } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";
import { toast } from "react-toastify";

async function updateUserInformation(obj) {
  const { data, error } = await supabase.auth.updateUser(obj);
  if (error) throw new Error(error.message);
  return data;
}
export function useUpdateUserInformation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserInformation,
    onError: () => toast.error("Can't update user information"),
    onSuccess: () => toast.success("User information updated successfully"),
  });
  return { mutateAsync, isPending };
}
export async function verifyUserPassword(userEmail, userPassword) {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });
  if (signInError)
    toast.error("Current password is incorrect:", signInError.message);
}
