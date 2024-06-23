import axios from "axios";
import { getName } from "country-list";
import { StoreData } from "../../../../shared/types/system";

const url = "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json";

async function query() {
  const response = await axios.get(url);
  const countries = getListOfCountries(response.data);

  return {
    countries,
    locations: response.data,
  };
}

function getListOfCountries(data: StoreData[]) {
  const countries = Array.from(new Set(data.map(location => location.country))).map(country => {
    return {
      name: getName(country),
      code: country,
    };
  });
  return countries;
}

export default {
  query,
};
