import { FC, useEffect, useState } from "react";
import { StoreData } from "../../../shared/types/system";
import { useIntersectionPagination } from "../hooks/useIntersectionPagination";
import { useOutsideClick } from "../hooks/useOutsideClick";

type StoreModalProps = {
  stores: StoreData[];
  selectedStore: StoreData | null;
  setSelectedStore: React.Dispatch<React.SetStateAction<StoreData | null>>;
};

export const StoreModal: FC<StoreModalProps> = ({ stores, setSelectedStore, selectedStore }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [currStores, setCurrStores] = useState<StoreData[]>([]);
  const { paginationIdx, intersectionRef } = useIntersectionPagination();
  const { outsideClickRef } = useOutsideClick<HTMLElement>(close);

  function close() {
    setIsOpened(false);
  }

  function handleItemClick(store: StoreData) {
    setSelectedStore(store);
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
      <div
        className="color-primary flex flex-col items-center w-full gap-1"
        onClick={() => setIsOpened(true)}
      >
        <div className="color-primary font-bold cursor-pointer">Select a store</div>
        <div className="color-primary cursor-pointer border w-full rounded-md shadow-sm h-[40px] flex items-center justify-center">
          <div>{selectedStore?.name}</div>
        </div>
      </div>

      {isOpened && (
        <>
          <section
            ref={outsideClickRef}
            className="fixed left-1/2 top-1/2 z-[150] flex min-w-[300px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12 overflow-auto rounded-lg p-8 shadow-lg border border-gray-300 bg-white"
          >
            <div className="flex flex-col items-center gap-1 w-full">
              <h3 className="color-primary playwrite-nz text-xl font-bold text-center sm:text-2xl">
                Select a store
              </h3>
              <p className="color-primary text-md sm:text-lg mb-4">
                scroll down to see more stores
              </p>
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

            <div>
              <button
                className="color-primary font-bold cursor-pointer border border-gray-300 rounded-full shadow-md py-2 px-4 hover:bg-gray-100"
                onClick={() => setIsOpened(false)}
              >
                Close
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};
