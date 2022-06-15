import { SearchIcon, ArrowDownIcon } from "@heroicons/react/solid";
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
  const [errorMessage, setErrorMessage] = useState("");

  async function getStores() {
    if (!address) return;
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
        setStores(data.stores);
        console.log(data);
      } else {
        setErrorMessage("No stores found");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error, view console for details");
    }
  }

  return (
    <>
      {address && (
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
            <div className="flex justify-between gap-3">
              <p>Select Store</p>
              <p className="text-right underline opacity-50">estimated wait</p>
            </div>
            {stores.map((store) => {
              // if (!store.ServiceMethodEstimatedWaitMinutes.Delivery) {
              // console.log(store);
              // }
              return (
                <div
                  key={store.StoreID}
                  className="cursor-pointer bg-white"
                  onClick={() => {
                    if (store.ServiceIsOpen.Delivery) {
                      setStoreID(store.StoreID);
                    }
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
