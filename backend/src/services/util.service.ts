export interface QueryString {
  [key: string]: string | undefined;
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  searchTerm?: string;
  searchField?: string;
}

function convertQueryParamsToBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
}

export { convertQueryParamsToBoolean };
