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
    <div className="flex">
      <select
        className="w-64 p-2 border border-gray-300 rounded-md shadow-md"
        name="countries"
        id="countries"
        onChange={handleChange}
        value={selectedCountry}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};
