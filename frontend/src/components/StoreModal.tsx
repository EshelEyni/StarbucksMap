import { FC, useEffect, useState } from "react";
import { StoreData } from "../../../shared/types/system";
import { useIntersectionPagination } from "../hooks/useIntersectionPagination";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Button } from "./Button";
import classNames from "classnames";

type StoreModalProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  stores: StoreData[];
  handleStoreSelect: (store: StoreData) => void;
};

export const StoreModal: FC<StoreModalProps> = ({
  isOpened,
  setIsOpened,
  stores,
  handleStoreSelect,
}) => {
  const [currStores, setCurrStores] = useState<StoreData[]>([]);
  const { paginationIdx, intersectionRef } = useIntersectionPagination();
  const { outsideClickRef } = useOutsideClick<HTMLElement>(close);

  function close() {
    setIsOpened(false);
  }

  function handleItemClick(store: StoreData) {
    handleStoreSelect(store);
    close();
  }

  useEffect(() => {
    if (!stores) return;

    const limit = 50;
    const endIdx = paginationIdx * limit;
    const currStores = stores.slice(0, endIdx);
    setCurrStores(currStores);

    return () => {
      setCurrStores([]);
    };
  }, [stores, paginationIdx]);

  return (
    <>
      <section
        ref={outsideClickRef}
        className={classNames(
          "fixed left-1/2 top-1/2 z-[150] flex min-w-[300px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12 overflow-auto rounded-lg p-8 shadow-lg border border-gray-300 bg-white h-3/4",
          {
            hidden: !isOpened,
          },
        )}
      >
        <div className="flex flex-col items-center gap-1 w-full">
          <h3 className="color-primary rajdani-semibold text-xl text-center sm:text-2xl">
            Select a store
          </h3>
          <p className="color-primary text-sm sm:text-md mb-1">scroll down to see more stores</p>
        </div>
        <ul className="flex flex-col items-center gap-2 w-full sm:w-96 h-96 overflow-auto">
          {currStores.map(store => (
            <li
              key={store.store_id}
              className="color-primary cursor-pointer hover:bg-gray-100 w-full p-1"
              onClick={() => handleItemClick(store)}
            >
              {store.name}
            </li>
          ))}
          <li ref={intersectionRef} className="h-40 w-full"></li>
        </ul>

        <Button onClickFn={() => setIsOpened(false)}>Close</Button>
      </section>
    </>
  );
};
