import { AnyFunction, JsendResponse } from "../../../shared/types/system";

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

function debounce(
  func: AnyFunction,
  delay: number,
): { debouncedFunc: AnyFunction; cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedFunc = function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
  const cancel = () => {
    clearTimeout(timeoutId);
  };
  return { debouncedFunc, cancel };
}

export { handleServerResponse, debounce };
