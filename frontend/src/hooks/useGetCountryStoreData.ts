import { useQuery } from "@tanstack/react-query";
import { CountryStoreData } from "../../../shared/types/system";
import { storeService } from "../services/store.service";

type UseGetCountryStoreData = {
  data: CountryStoreData | undefined;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export function useGetCountryStoreData(): UseGetCountryStoreData {
  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["country-data"],
    queryFn: storeService.getCountryStoreData,
  });

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
  };
}
