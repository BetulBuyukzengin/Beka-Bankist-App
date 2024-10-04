import { useMutation } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";
import { toast } from "react-toastify";

async function updateUserInformation({ updatedUser, toastMessage }) {
  const { data, error } = await supabase.auth.updateUser(updatedUser);
  if (error) throw new Error(error.message);
  return { data, toastMessage };
}
export function useUpdateUserInformation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserInformation,
    onError: (returnedObject) => toast.error(returnedObject.toastMessage.error),
    onSuccess: (returnedObject) => {
      toast.success(returnedObject.toastMessage.success);
    },
  });
  return { mutateAsync, isPending };
}

export async function verifyUserPassword(userEmail, userPassword) {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });
  if (signInError) {
    toast.error("Current password is incorrect:", signInError.message);
    return false;
  } else return true;
}
