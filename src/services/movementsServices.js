import { useQuery } from "@tanstack/react-query";
import { supabase } from "../Supabase/supabase";

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
