"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListOfStoreCountries = void 0;
const country_list_1 = require("country-list");
function getListOfStoreCountries(data) {
    const countries = [
        { name: "All", code: "all" },
        ...Array.from(new Set(data.map(store => store.country)))
            .map(country => {
            return {
                name: (0, country_list_1.getName)(country) || country,
                code: country,
            };
        })
            .sort((a, b) => a.name.localeCompare(b.name)),
    ];
    return countries;
}
exports.getListOfStoreCountries = getListOfStoreCountries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvc3RvcmUvZGF0YS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBdUM7QUFHdkMsU0FBUyx1QkFBdUIsQ0FBQyxJQUFpQjtJQUNoRCxNQUFNLFNBQVMsR0FBRztRQUNoQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtRQUM1QixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3JELEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNiLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLElBQUEsc0JBQU8sRUFBQyxPQUFPLENBQUMsSUFBSSxPQUFPO2dCQUNqQyxJQUFJLEVBQUUsT0FBTzthQUNkLENBQUM7UUFDSixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQsQ0FBQztJQUNGLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFUSwwREFBdUIifQ==