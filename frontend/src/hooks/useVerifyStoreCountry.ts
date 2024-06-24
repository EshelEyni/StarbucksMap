import { useMutation } from "@tanstack/react-query";
import { storeService } from "../services/store.service";
import { VerifyStoreCountryParams } from "../../../shared/types/system";

type UseVerifyStoreCountry = {
  verifyStoreCountry: (params: VerifyStoreCountryParams) => void;
  isPending: boolean;
  msg: string | undefined;
};

export function useVerifyStoreCountry(): UseVerifyStoreCountry {
  const {
    mutate: verifyStoreCountry,
    isPending,
    data: msg,
  } = useMutation({
    mutationFn: async ({ country, store }: VerifyStoreCountryParams) => {
      if (!country || !store) return;
      return storeService.verifyStoreCountry({ country, store });
    },
  });

  return { verifyStoreCountry, isPending, msg };
}
