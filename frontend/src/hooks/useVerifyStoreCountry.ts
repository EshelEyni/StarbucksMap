import { useMutation } from "@tanstack/react-query";
import { storeService } from "../services/store.service";
import { VerifyStoreCountryParams } from "../../../shared/types/system";

type UseVerifyStoreCountry = {
  verifyStoreCountry: (params: VerifyStoreCountryParams) => void;
  msg: string | undefined;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
};

export function useVerifyStoreCountry(): UseVerifyStoreCountry {
  const {
    mutate: verifyStoreCountry,
    data: msg,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ alpha3Code, longitude, latitude }: VerifyStoreCountryParams) => {
      if (!alpha3Code) return Promise.reject("Country code is required");
      if (!longitude) return Promise.reject("Longitude is required");
      if (!latitude) return Promise.reject("Latitude is required");
      return storeService.verifyStoreCountry({ alpha3Code, longitude, latitude });
    },
  });

  return { verifyStoreCountry, msg, isPending, isSuccess, isError, error };
}
