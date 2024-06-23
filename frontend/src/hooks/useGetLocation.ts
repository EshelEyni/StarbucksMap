import { useQuery } from "@tanstack/react-query";
import { CountryData, StoreData } from "../../../shared/types/system";
import { locationService } from "../services/location.service";

type useGetLocationResult = {
  locations: StoreData[];
  countries: CountryData[];
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export function useGetLocation(): useGetLocationResult {
  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      return locationService.query();
    },
  });

  const locations = data?.locations || [];
  const countries = data?.countries || [];

  return { locations, countries, error, isLoading, isSuccess, isError };
}
