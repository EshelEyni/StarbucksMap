import { useQuery } from "@tanstack/react-query";
import { CountryData, StoreData } from "../../../shared/types/system";
import { storeService } from "../services/store.service";

type useGetStoreDataResult = {
  stores: StoreData[];
  countries: CountryData[];
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export function useGetStoreData(queryString: string = ""): useGetStoreDataResult {
  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["store", queryString],
    queryFn: async () => {
      return storeService.query(queryString);
    },
  });

  const stores = data?.stores || [];
  const countries = data?.countries || [];

  return { stores, countries, error, isLoading, isSuccess, isError };
}
