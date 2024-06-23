import { FC } from "react";
import logo from "/images/android-chrome-512x512.png";
export const Loader: FC = () => {
  return (
    <div>
      <img src={logo} alt="loading" className="img-rotate h-32 w-32" />
    </div>
  );
};
