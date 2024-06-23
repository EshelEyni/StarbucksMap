import { useQuery } from "@tanstack/react-query";
import { CountryData, StoreData } from "../../../shared/types/system";
import { storeService } from "../services/store.service";

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

export function useGetStoreData(
  queryString: string = ""
): useGetStoreDataResult {
  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["store", queryString],
    queryFn: async () => {
      return storeService.query(queryString);
    },
  });

  if (!data) {
    return {
      stores: [],
      countries: [],
      centralPoint: null,
      zoomLevel: null,
      error,
      isLoading,
      isSuccess,
      isError,
    };
  }

  const { stores, countries, centralPoint, zoomLevel } = data;

  return {
    stores,
    countries,
    centralPoint,
    zoomLevel,
    error,
    isLoading,
    isSuccess,
    isError,
  };
}
