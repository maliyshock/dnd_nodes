import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/getData.ts";
import { KnimeNode } from "../types";

export function useGetNodes() {
  const { status, error, data } = useQuery<KnimeNode[]>({
    queryKey: ["data"],
    queryFn: getData,
  });

  return {
    status,
    error,
    data,
  };
}
