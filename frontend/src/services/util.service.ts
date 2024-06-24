import { JsendResponse } from "../../../shared/types/system";

function handleServerResponse<T>(response: JsendResponse): T {
  if (response.status === "success") {
    return response.data;
  } else if (response.status === "fail") {
    const errorMessages = Object.entries(response.data)
      .map(([field, message]) => `${field}: ${message}`)
      .join(", ");
    throw new Error(errorMessages);
  } else {
    throw new Error("Unexpected response status");
  }
}

export { handleServerResponse };
