export type AnyFunction = (...args: any[]) => any;

export type JsendResponse = {
  status: string;
  requested_at?: string;
  result?: number;
  data?: any;
  message?: string;
};

export type StoreData = {
  city: string;
  name: string;
  country: string;
  longitude: number;
  latitude: number;
  store_id: number;
};

export type CountryData = {
  name: string;
  code: string;
};

export type StoreDataQueryRes = {
  stores: StoreData[];
  countries: CountryData[];
};
