import classNames from "classnames";
import { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClickFn?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  className = classNames(
    "color-primary font-bold cursor-pointer border border-gray-300 rounded-full shadow-md py-2 px-4 hover:bg-gray-100",
    {
      "opacity-50": disabled,
    },
  ),
  onClickFn,
  type = "button",
}) => {
  return (
    <button onClick={onClickFn} className={className} type={type} disabled={disabled}>
      {children}
    </button>
  );
};
