import { useMutation } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";

async function sendContactMessage(newMessage) {
  const { data, error } = await supabase
    .from("contactForm")
    .insert([newMessage])
    .select();
  if (error) throw new Error(error.message);
  return newMessage;
}
export function useSendContactMessage() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (newMessage) => sendContactMessage(newMessage),
  });
  return { mutateAsync, isPending };
}
