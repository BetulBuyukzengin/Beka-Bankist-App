import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

async function getMovements() {
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
  const { mutateAsync: createMovement, isLoading: isCreating } = useMutation({
    mutationFn: (data) => {
      createMovements(data);
    },
    onSuccess: () => {
      toast.success("Transfer was successfully completed");
    },
    onError: () =>
      toast.error(
        "An error occurred during transfer transaction, please try again later!"
      ),
  });
  return { isCreating, createMovement };
}

//! columnToSort,directionObj ekledım burda kaldım
async function filterMovements({
  filter,
  columnToSort = "amountToSend",
  directionObj = { ascending: true },
}) {
  let { data, error } = await supabase
    .from("movements")
    .select("*")
    .eq("status", filter)
    .order(columnToSort, directionObj);

  if (error) throw new Error(error);
  return data;
}
export function useFilterMovements({ filter, columnToSort, directionObj }) {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useQuery({
    queryFn: () => filterMovements({ filter, columnToSort, directionObj }),
    queryKey: ["movements", searchParams.get("filter")],
  });
  return { data, isLoading };
}
