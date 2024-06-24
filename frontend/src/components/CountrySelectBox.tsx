import { FC } from "react";
import { CountryData } from "../../../shared/types/system";

type CountrySelectBoxProps = {
  countries: CountryData[];
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
};

export const CountrySelectBox: FC<CountrySelectBoxProps> = ({
  countries,
  selectedCountry,
  setSelectedCountry,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSelectedCountry(value);
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4 min-h-32 justify-center">
      <label htmlFor="countries" className="cursor-pointer">
        <h3 className="text-2xl color-primary rajdani-bold font-bold">Choose a country:</h3>
      </label>
      <select
        className="color-primary w-full p-1 sm:p-2 border border-gray-300 rounded-md shadow-md cursor-pointer"
        name="countries"
        id="countries"
        onChange={handleChange}
        value={selectedCountry}
      >
        {countries.map(country => (
          <option
            key={country.code}
            value={country.code}
            className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md"
          >
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};
