import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";
import { toast } from "react-toastify";

export async function getMovements() {
  let { data: movements, error } = await supabase.from("movements").select("*");
  if (error) throw new Error(error);
  return movements;
}
export function useMovements() {
  const { data: movements, isLoading } = useQuery({
    queryFn: getMovements,
    queryKey: ["movements"],
  });
  return { movements, isLoading };
}

export async function createMovements(newMovement) {
  const { data, error } = await supabase
    .from("movements")
    .insert([newMovement]);
  if (error) throw new Error(error.message);
  return data;
}

export function useCreateMovements() {
  const queryClient = useQueryClient();
  const { mutateAsync: createMovement, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createMovements(data),
    onSuccess: () => {
      toast.success("Transfer was successfully completed");
      queryClient.invalidateQueries({ queryKey: ["movements"] });
    },
    onError: () =>
      toast.error(
        "An error occurred during transfer transaction, please try again later!"
      ),
  });
  return { isCreating, createMovement };
}
