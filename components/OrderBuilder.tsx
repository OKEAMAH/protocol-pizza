import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Customer, Address } from "../lib/customer";
import { Item } from "../lib/item";
import { ValidateRequestBody } from "../pages/api/validate";

export default function OrderBuilder({
  storeID,
  customer,
  address,
  items,
  setItems,
  orderIsValid,
  setOrderIsValid,
}: {
  storeID: string;
  customer: Customer;
  address: Address;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  orderIsValid: boolean;
  setOrderIsValid: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function validateOrder() {
    // Validate item with domino's API
    const body: ValidateRequestBody = {
      storeID: storeID,
      customer: customer,
      address: address,
      items: items,
    };
    const result = await fetch(`/api/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await result.json();
    if (json["status"] && json["status"] != -1) {
      setOrderIsValid(true);
    } else {
      setOrderIsValid(false);
      setErrorMessage("Error validating order");
    }
  }

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Order</p>
        {items.map((item) => {
          console.log(item);
          if (!item.iD || !item.descriptions || !item.name) {
            return;
          }
          return (
            <div key={item.iD} className="text-sm flex items-center gap-2">
              <XCircleIcon
                className="h-6 w-6 text-red-400 shrink-0 cursor-pointer"
                onClick={() => {
                  setOrderIsValid(false);
                  setItems(
                    items.filter((i) => {
                      return i.iD != item.iD;
                    })
                  );
                }}
              />
              <div className="w-full flex flex-col bg-gray-100 rounded-xl p-3">
                <p>{item.name}</p>
                <p>{item.descriptions[0].value}</p>
              </div>
            </div>
          );
        })}
        {!orderIsValid && (
          <button
            className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
            onClick={() => validateOrder()}
          >
            <CheckCircleIcon className="h-4 w-4 text-white" />
            Validate Order
          </button>
        )}
        {orderIsValid && !errorMessage && (
          <div
            className="w-full bg-green-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
          >
            <CheckCircleIcon className="h-4 w-4 text-white" />
            Valid Order
          </div>
        )}
        {errorMessage && (
          <div>{errorMessage}</div>
        )}
      </div>
    </>
  );
}
