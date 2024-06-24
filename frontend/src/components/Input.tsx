import classNames from "classnames";
import { FC } from "react";

type InputProps = {
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  maxLength?: number;
  label?: string;
  classes?: string;
  labelClasses?: string;
  inputClasses?: string;
};

export const Input: FC<InputProps> = ({
  type,
  name,
  onChange,
  value,
  placeholder,
  maxLength,
  label,
  classes = "",
  labelClasses = "",
  inputClasses = "",
}) => {
  return (
    <div
      className={classNames("flex flex-col gap-1 items-center", {
        [classes]: !!classes,
      })}
    >
      <label
        className={classNames("color-primary rajdani-semibold text-lg cursor-pointer", {
          [labelClasses]: !!labelClasses,
        })}
      >
        {label}
      </label>
      <input
        className={classNames(
          "mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm sm:text-sm",
          {
            [inputClasses]: !!inputClasses,
          },
        )}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </div>
  );
};
