import { useQuery } from "@tanstack/react-query";
import { CountryData, StoreData } from "../../../shared/types/system";
import { storeService } from "../services/store.service";
import { useEffect, useState } from "react";

type useGetStoreDataResult = {
  stores: StoreData[];
  countries: CountryData[];
  centralPoint: [number, number] | null;
  zoomLevel: number | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type State = {
  stores: StoreData[];
  countries: CountryData[];
  centralPoint: [number, number] | null;
  zoomLevel: number | null;
};

export function useGetStoreData(queryString: string = ""): useGetStoreDataResult {
  const [state, setState] = useState<State>({
    stores: [],
    countries: [],
    centralPoint: null,
    zoomLevel: null,
  });

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["store", queryString],
    queryFn: async () => {
      return storeService.query(queryString);
    },
  });

  useEffect(() => {
    if (data) {
      const { stores, countries, centralPoint, zoomLevel } = data;
      setState({ stores, countries, centralPoint, zoomLevel });
    }
  }, [data]);

  return {
    ...state,
    error,
    isLoading,
    isSuccess,
    isError,
  };
}
