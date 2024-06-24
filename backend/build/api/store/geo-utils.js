"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByCountry = exports.getZoomLevel = exports.getCentralPoint = exports.getCountryPolygon = void 0;
const turf_1 = require("@turf/turf");
function getCountryPolygon(geojson) {
    let countryPolygons;
    const { type, coordinates } = geojson;
    if (type === "MultiPolygon")
        countryPolygons = coordinates.map(coords => (0, turf_1.polygon)(coords));
    else
        countryPolygons = [(0, turf_1.polygon)(coordinates)];
    return countryPolygons;
}
exports.getCountryPolygon = getCountryPolygon;
function getCentralPoint(countryData) {
    if (!countryData || !countryData.boundingbox || countryData.boundingbox.length !== 4)
        return null;
    const { boundingbox } = countryData;
    const [minLat, maxLat, minLon, maxLon] = boundingbox.map(Number);
    const centralLat = (minLat + maxLat) / 2;
    const centralLon = (minLon + maxLon) / 2;
    return [centralLon, centralLat];
}
exports.getCentralPoint = getCentralPoint;
function getZoomLevel(countryData) {
    if (!countryData || !countryData.boundingbox || countryData.boundingbox.length !== 4)
        return null;
    const { boundingbox } = countryData;
    const [minLat, maxLat, minLon, maxLon] = boundingbox.map(Number);
    const maxDiff = Math.max(maxLat - minLat, maxLon - minLon);
    switch (true) {
        case maxDiff > 10:
            return 3; // Very large countries
        case maxDiff > 5:
            return 5; // Large countries
        case maxDiff > 2:
            return 7; // Medium countries
        case maxDiff > 1:
            return 8; // Small countries
        case maxDiff > 0.5:
            return 9; // Smaller countries
        default:
            return 10; // Very small countries
    }
}
exports.getZoomLevel = getZoomLevel;
function filterByCountry({ stores, country, countryData, }) {
    // If no country boundary is found, filter by country code
    if (!countryData || !countryData.geojson || !countryData.geojson.coordinates) {
        return stores.filter(store => store.country === country);
    }
    const { geojson } = countryData;
    const countryPolygons = getCountryPolygon(geojson);
    return stores.filter(store => {
        const storePoint = (0, turf_1.point)([store.longitude, store.latitude]);
        return countryPolygons.some((poly) => (0, turf_1.booleanPointInPolygon)(storePoint, poly));
    });
}
exports.filterByCountry = filterByCountry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9zdG9yZS9nZW8tdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQW1FO0FBSW5FLFNBQVMsaUJBQWlCLENBQUMsT0FBZ0I7SUFDekMsSUFBSSxlQUFzRCxDQUFDO0lBQzNELE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRXRDLElBQUksSUFBSSxLQUFLLGNBQWM7UUFDekIsZUFBZSxHQUFJLFdBQThCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBQSxjQUFPLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7UUFFakYsZUFBZSxHQUFHLENBQUMsSUFBQSxjQUFPLEVBQUMsV0FBMkIsQ0FBd0MsQ0FBQyxDQUFDO0lBRWxHLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUM7QUEwRFEsOENBQWlCO0FBeEQxQixTQUFTLGVBQWUsQ0FBQyxXQUEyQjtJQUNsRCxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDbEcsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLFdBQVcsQ0FBQztJQUNwQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRSxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQWlEMkIsMENBQWU7QUEvQzNDLFNBQVMsWUFBWSxDQUFDLFdBQTJCO0lBQy9DLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNsRyxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsV0FBVyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFFM0QsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLE9BQU8sR0FBRyxFQUFFO1lBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUFDbkMsS0FBSyxPQUFPLEdBQUcsQ0FBQztZQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUMsa0JBQWtCO1FBQzlCLEtBQUssT0FBTyxHQUFHLENBQUM7WUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtRQUMvQixLQUFLLE9BQU8sR0FBRyxDQUFDO1lBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7UUFDOUIsS0FBSyxPQUFPLEdBQUcsR0FBRztZQUNoQixPQUFPLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtRQUNoQztZQUNFLE9BQU8sRUFBRSxDQUFDLENBQUMsdUJBQXVCO0tBQ3JDO0FBQ0gsQ0FBQztBQTJCNEMsb0NBQVk7QUF6QnpELFNBQVMsZUFBZSxDQUFDLEVBQ3ZCLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQUtaO0lBQ0MsMERBQTBEO0lBQzFELElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7UUFDNUUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQztLQUMxRDtJQUVELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDaEMsTUFBTSxlQUFlLEdBQTBDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFGLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixNQUFNLFVBQVUsR0FBRyxJQUFBLFlBQUssRUFBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDNUQsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBeUMsRUFBRSxFQUFFLENBQ3hFLElBQUEsNEJBQXFCLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUN4QyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRTBELDBDQUFlIn0=