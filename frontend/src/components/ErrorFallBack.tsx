import { FC } from "react";

interface ErrorFallBackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallBack: FC<ErrorFallBackProps> = ({ error }) => {
  const isDevEnv = process.env.NODE_ENV === "development";
  return (
    <main className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="flex max-w-[550px] flex-col items-center justify-center">
        <h1 className="mb-2 mt-20 text-2xl font-semibold text-gray-800">
          Oops! Something went wrong.
        </h1>
        <p className="mb-4 text-gray-600 text-center">
          We apologize for the inconvenience. You can try reloading the page
        </p>

        {isDevEnv && (
          <div className="self-start p-2 text-gray-800 overflow-scroll max-w-[100vw]">
            <p className="text-sm overflow-scroll">{error.message}</p>
            <p className="text-sm overflow-scroll">{error.stack}</p>
          </div>
        )}

        <div className="my-6 flex justify-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Reload
          </button>
        </div>
      </div>
    </main>
  );
};
