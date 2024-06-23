import { FC } from "react";

type ErrorMsgProps = {
  error: Error | null;
};

export const ErrorMsg: FC<ErrorMsgProps> = ({ error }) => {
  return (
    <div className="text-red-500 text-center">
      Error: {error?.message.toString()}
    </div>
  );
};
