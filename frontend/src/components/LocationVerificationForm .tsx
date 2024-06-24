import { FC, useEffect, useReducer, useState } from "react";
import { FullCountryData, StoreData } from "../../../shared/types/system";
import { useGetCountryStoreData } from "../hooks/useGetCountryStoreData";
import { Loader } from "./Loader";
import { ErrorMsg } from "./ErrorMsg";
import { StoreModal } from "./StoreModal";
import { Button } from "./Button";
import { useVerifyStoreCountry } from "../hooks/useVerifyStoreCountry";
import { Input } from "./Input";
type State = {
  country: FullCountryData | null;
  store: StoreData | null;
  alpha3Code: string | null;
  longitude: number | null;
  latitude: number | null;
};

type Action =
  | { type: "SET_COUNTRY"; payload: FullCountryData | null }
  | { type: "SET_STORE"; payload: StoreData | null }
  | { type: "SET_ALPHA3CODE"; payload: string | null }
  | { type: "SET_LONGITUDE"; payload: number | null }
  | { type: "SET_LATITUDE"; payload: number | null };

const defaultState = {
  country: null,
  store: null,
  alpha3Code: null,
  longitude: null,
  latitude: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_COUNTRY":
      if (!action.payload) return { ...state, country: null };
      return { ...state, country: action.payload, alpha3Code: action.payload.alpha3Code };
    case "SET_STORE":
      if (!action.payload) return { ...state, store: null };
      return {
        ...state,
        store: action.payload,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      };
    case "SET_ALPHA3CODE":
      return { ...state, alpha3Code: action.payload };
    case "SET_LONGITUDE":
      return { ...state, longitude: action.payload };
    case "SET_LATITUDE":
      return { ...state, latitude: action.payload };
    default:
      return state;
  }
}
export const LocationVerificationForm: FC = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetCountryStoreData();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { country, store, alpha3Code, longitude, latitude } = state;

  const {
    verifyStoreCountry,
    msg,
    isPending,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyStoreCountry();

  function handleCountrySelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!data) return;
    const { value } = event.target;
    const country = data.countries.find(c => c.alpha3Code === value) || null;
    dispatch({ type: "SET_COUNTRY", payload: country });
  }

  function handleStoreSelect(store: StoreData) {
    dispatch({ type: "SET_STORE", payload: store });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "alpha3Code":
        dispatch({ type: "SET_ALPHA3CODE", payload: value });
        break;
      case "longitude":
        dispatch({ type: "SET_LONGITUDE", payload: parseFloat(value) });
        break;
      case "latitude":
        dispatch({ type: "SET_LATITUDE", payload: parseFloat(value) });
        break;
    }
  }

  async function onSubmit() {
    if (!alpha3Code || !longitude || !latitude) return;
    verifyStoreCountry({ alpha3Code, longitude, latitude });
  }

  useEffect(() => {
    if (!isSuccess || !data) return;
    const { countries, stores } = data;
    if (!store) dispatch({ type: "SET_STORE", payload: stores[0] });
    if (!country) dispatch({ type: "SET_COUNTRY", payload: countries[0] });
  }, [isSuccess, data, country, store]);

  if (isLoading || isPending) return <Loader />;
  if (isError && error) return <ErrorMsg error={error} />;

  if (!isSuccess || !data) return null;

  const { countries } = data;

  return (
    <div className="flex flex-col items-center gap-2">
      <h4 className="color-primary rajdani-bold text-2xl font-bold text-center mb-2">
        Verify store country
      </h4>

      <p className="color-primary text-sm sm:text-md mb-1">
        Select a country and a store to verify the location of the store on the map.
      </p>

      <div
        className="color-primary flex flex-col items-center w-full gap-1"
        onClick={() => setIsOpened(true)}
      >
        <div className="color-primary rajdani-semibold text-xl cursor-pointer">Select a store</div>
        <div className="color-primary cursor-pointer border w-full rounded-md shadow-sm h-[30px] sm:h-[40px] flex items-center justify-center">
          <div>{store?.name}</div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <Input
          type="number"
          name="longitude"
          onChange={handleInputChange}
          value={longitude?.toString() || ""}
          placeholder="Longitude"
          label="Longitude"
          classes="mr-1"
          inputClasses="w-32 sm:w-40 text-center"
        />
        <Input
          type="number"
          name="latitude"
          onChange={handleInputChange}
          value={latitude?.toString() || ""}
          placeholder="Latitude"
          label="Latitude"
          classes="ml-1"
          inputClasses="w-32 sm:w-40 text-center"
        />
      </div>

      <StoreModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        stores={data.stores}
        handleStoreSelect={handleStoreSelect}
      />

      <div className="flex flex-col items-center gap-2 w-full ">
        <label
          htmlFor="countries-data"
          className="color-primary rajdani-semibold text-xl cursor-pointer"
        >
          Select a country
        </label>
        <select
          className="color-primary w-full p-1 sm:p-2 border border-gray-300 rounded-md shadow-md cursor-pointer"
          name="countries"
          id="countries-data"
          onChange={handleCountrySelectChange}
          defaultValue={country?.name || "Country name"}
        >
          {countries.map(c => (
            <option
              key={c.alpha3Code}
              value={c.alpha3Code}
              className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md"
            >
              {c.name}
            </option>
          ))}
        </select>

        <Input
          type="text"
          name="alpha3Code"
          onChange={handleInputChange}
          value={alpha3Code || ""}
          placeholder="alpha3Code"
          maxLength={3}
          label="Three letter country code"
          inputClasses="w-14 text-center"
        />
      </div>

      <Button onClickFn={onSubmit} disabled={isPending} classes="mt-1">
        Submit
      </Button>

      <div className="flex flex-col items-center gap-2 w-full p-2 min-h-11">
        {isVerifySuccess && msg && <p className="color-primary">{msg}</p>}
        {isVerifyError && verifyError && <ErrorMsg error={verifyError} />}
      </div>
    </div>
  );
};
