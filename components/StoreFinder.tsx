import { SearchIcon, ArrowDownIcon, RefreshIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction, useState } from "react";
import { Address } from "../lib/customer";

export default function StoreFinder({
  address,
  storeID,
  setStoreID,
}: {
  address: Address;
  storeID: string;
  setStoreID: Dispatch<SetStateAction<string>>;
}) {
  const [stores, setStores] = useState(Array<any>());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function getStores() {
    if (!address) return;
    setIsLoading(true);
    setStoreID("");
    setStores([]);
    setErrorMessage("");
    try {
      const result = await fetch(`/api/nearbyStores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });
      const data = await result.json();
      if (data.stores.length > 0) {
        setStores(data.stores.slice(0, 5));
        console.log(data);
      } else {
        setErrorMessage("No stores found");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error, view console for details");
    }
    setIsLoading(false);
  }

  return (
    <>
      {address && (
        <>
          {!isLoading && (
            <div className="flex items-center gap-1 mx-auto bg-orange-500 text-white rounded-xl px-3 py-1 drop-shadow">
              <SearchIcon className="h-4 w-4" />
              <button
                onClick={() => {
                  getStores();
                }}
              >
                Find Store
              </button>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center gap-1 mx-auto bg-orange-500 text-white rounded-xl px-3 py-1 drop-shadow">
              <div>Loading</div>
              <RefreshIcon className="h-4 w-4 animate-reverse-spin" />
            </div>
          )}
        </>
      )}
      {errorMessage && (
        <>
          <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
          <p className="text-gray-500 text-center">{errorMessage}</p>
        </>
      )}
      {stores.length > 0 && !errorMessage && (
        <>
          <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
          <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
            <p>Select Store</p>
            <p className="font-mono text-xs">
              We recommend selecting the closest.
            </p>
            {stores.map((store) => {
              // if (!store.ServiceMethodEstimatedWaitMinutes.Delivery) {
              // console.log(store);
              // }
              return (
                <div
                  key={store.StoreID}
                  className="cursor-pointer bg-white"
                  onClick={() => {
                    // if (store.ServiceIsOpen.Delivery) {
                    setStoreID(store.StoreID);
                    // }
                  }}
                >
                  <div className="flex text-sm gap-2">
                    {storeID == store.StoreID ? (
                      <div className="h-4 w-4 shrink-0 border-2 rounded-full my-auto bg-orange-500"></div>
                    ) : (
                      <div className="h-4 w-4 shrink-0 border-2 rounded-full my-auto hover:bg-orange-100"></div>
                    )}
                    <p className="">
                      {store.AddressDescription.split("\n")[0]},{" "}
                      {store.AddressDescription.split("\n")[1]}
                    </p>
                    <div className="grow h-0 my-auto sm:border"></div>
                    {store.ServiceIsOpen.Delivery ? (
                      <div className="text-green-500 font-mono whitespace-nowrap my-auto">
                        {/* {store.ServiceMethodEstimatedWaitMinutes.Delivery.Min ?? 0}-
                        {store.ServiceMethodEstimatedWaitMinutes.Delivery.Max ?? 0}{" "}
                        mins */}
                        Open
                      </div>
                    ) : (
                      <div className="text-red-500 font-mono whitespace-nowrap my-auto">
                        Closed
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
