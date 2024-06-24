"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const turf_1 = require("@turf/turf");
const error_service_1 = require("../../services/error.service");
const geo_utils_1 = require("./geo-utils");
const data_utils_1 = require("./data-utils");
const external_data_service_1 = require("./external-data-service");
const country_list_1 = require("country-list");
async function query({ country }) {
    let stores = await (0, external_data_service_1.fetchStoresData)();
    const countries = (0, data_utils_1.getListOfStoreCountries)(stores);
    if (country === "all") {
        return {
            countries,
            stores,
            centralPoint: [34.794758, 32.07576],
            zoomLevel: 6,
        };
    }
    const countryData = await (0, external_data_service_1.fetchCountryData)(country);
    stores = (0, geo_utils_1.filterByCountry)({ stores, country, countryData });
    const centralPoint = (0, geo_utils_1.getCentralPoint)(countryData);
    const zoomLevel = (0, geo_utils_1.getZoomLevel)(countryData);
    return {
        countries,
        stores,
        centralPoint,
        zoomLevel,
    };
}
async function verifyStoreCountry({ alpha3Code, longitude, latitude, }) {
    const countriesData = await (0, external_data_service_1.fetchAllCountriesData)();
    const alpha2Code = countriesData.find(country => country.alpha3Code === alpha3Code)?.alpha2Code || "";
    if (!alpha2Code)
        throw new error_service_1.AppError("Country not found", 404);
    const countryData = await (0, external_data_service_1.fetchCountryData)(alpha2Code);
    if (!countryData)
        throw new error_service_1.AppError("Country not found", 404);
    const countryPolygon = (0, geo_utils_1.getCountryPolygon)(countryData.geojson);
    const storePoint = (0, turf_1.point)([Number(longitude), Number(latitude)]);
    const isStoreInCountry = (0, turf_1.booleanPointInPolygon)(storePoint, countryPolygon[0]);
    const stores = await (0, external_data_service_1.fetchStoresData)();
    const store = stores.find(store => store.latitude === latitude && store.longitude === longitude) || null;
    const countryFullName = (0, country_list_1.getName)(alpha2Code);
    return isStoreInCountry
        ? `Store ${store?.name ? store.name + " " : ""}is located in ${countryFullName}.`
        : `Store ${store?.name ? store.name + " " : ""}is not located in ${countryFullName}.`;
}
async function getCountryStoreData() {
    const countries = await (0, external_data_service_1.fetchAllCountriesData)();
    const res = await query({ country: "all" });
    const { stores } = res;
    return { countries, stores };
}
exports.default = {
    query,
    getCountryStoreData,
    verifyStoreCountry,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvc3RvcmUvc3RvcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHFDQUEwRDtBQUMxRCxnRUFBd0Q7QUFDeEQsMkNBQWdHO0FBQ2hHLDZDQUF1RDtBQUN2RCxtRUFBbUc7QUFDbkcsK0NBQXVDO0FBRXZDLEtBQUssVUFBVSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQXVCO0lBQ25ELElBQUksTUFBTSxHQUFHLE1BQU0sSUFBQSx1Q0FBZSxHQUFFLENBQUM7SUFDckMsTUFBTSxTQUFTLEdBQUcsSUFBQSxvQ0FBdUIsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUVsRCxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7UUFDckIsT0FBTztZQUNMLFNBQVM7WUFDVCxNQUFNO1lBQ04sWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztZQUNuQyxTQUFTLEVBQUUsQ0FBQztTQUNiLENBQUM7S0FDSDtJQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBQSx3Q0FBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUNwRCxNQUFNLEdBQUcsSUFBQSwyQkFBZSxFQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE1BQU0sWUFBWSxHQUFHLElBQUEsMkJBQWUsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxNQUFNLFNBQVMsR0FBRyxJQUFBLHdCQUFZLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFFNUMsT0FBTztRQUNMLFNBQVM7UUFDVCxNQUFNO1FBQ04sWUFBWTtRQUNaLFNBQVM7S0FDVixDQUFDO0FBQ0osQ0FBQztBQUVELEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxFQUNoQyxVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsR0FDaUI7SUFDekIsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFBLDZDQUFxQixHQUFFLENBQUM7SUFFcEQsTUFBTSxVQUFVLEdBQ2QsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQztJQUNyRixJQUFJLENBQUMsVUFBVTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTlELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBQSx3Q0FBZ0IsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUN2RCxJQUFJLENBQUMsV0FBVztRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRS9ELE1BQU0sY0FBYyxHQUFHLElBQUEsNkJBQWlCLEVBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlELE1BQU0sVUFBVSxHQUFHLElBQUEsWUFBSyxFQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLDRCQUFxQixFQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsdUNBQWUsR0FBRSxDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUU3RixNQUFNLGVBQWUsR0FBRyxJQUFBLHNCQUFPLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFFNUMsT0FBTyxnQkFBZ0I7UUFDckIsQ0FBQyxDQUFDLFNBQVMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLGVBQWUsR0FBRztRQUNqRixDQUFDLENBQUMsU0FBUyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxxQkFBcUIsZUFBZSxHQUFHLENBQUM7QUFDMUYsQ0FBQztBQUVELEtBQUssVUFBVSxtQkFBbUI7SUFDaEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFBLDZDQUFxQixHQUFFLENBQUM7SUFDaEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM1QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDL0IsQ0FBQztBQUVELGtCQUFlO0lBQ2IsS0FBSztJQUNMLG1CQUFtQjtJQUNuQixrQkFBa0I7Q0FDbkIsQ0FBQyJ9