"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCountriesData = exports.fetchCountryData = exports.fetchStoresData = void 0;
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
const logger_service_1 = require("../../services/logger.service");
async function fetchStoresData() {
    const url = "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json";
    const response = await axios_1.default.get(url);
    const stores = response.data;
    return stores;
}
exports.fetchStoresData = fetchStoresData;
async function fetchCountryData(country) {
    try {
        const response = await axios_1.default.get(`https://nominatim.openstreetmap.org/search?format=json&q=${country}&polygon_geojson=1&limit=1`);
        return response.data[0];
    }
    catch (error) {
        logger_service_1.logger.error("Error fetching country boundary", error);
        return null;
    }
}
exports.fetchCountryData = fetchCountryData;
async function fetchAllCountriesData() {
    const url = "https://www.iban.com/country-codes";
    const { data } = await axios_1.default.get(url);
    const $ = (0, cheerio_1.load)(data);
    const countries = [];
    $("table#myTable tbody tr").each((i, element) => {
        const name = $(element).find("td").first().text().trim();
        const alpha2Code = $(element).find("td").eq(1).text().trim();
        const alpha3Code = $(element).find("td").eq(2).text().trim();
        countries.push({ name, alpha2Code, alpha3Code });
    });
    return countries;
}
exports.fetchAllCountriesData = fetchAllCountriesData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtZGF0YS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9zdG9yZS9leHRlcm5hbC1kYXRhLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBQStCO0FBRS9CLGtEQUEwQjtBQUMxQixrRUFBdUQ7QUFHdkQsS0FBSyxVQUFVLGVBQWU7SUFDNUIsTUFBTSxHQUFHLEdBQUcsK0VBQStFLENBQUM7SUFDNUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFtQixDQUFDO0lBRTVDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFnQ1EsMENBQWU7QUE5QnhCLEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxPQUFlO0lBQzdDLElBQUk7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQzlCLDREQUE0RCxPQUFPLDRCQUE0QixDQUNoRyxDQUFDO1FBRUYsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCx1QkFBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQW1CeUIsNENBQWdCO0FBakIxQyxLQUFLLFVBQVUscUJBQXFCO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLG9DQUFvQyxDQUFDO0lBQ2pELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsTUFBTSxTQUFTLEdBQXNCLEVBQUUsQ0FBQztJQUV4QyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3RCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3RCxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUUyQyxzREFBcUIifQ==