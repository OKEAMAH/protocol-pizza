import {
  CheckCircleIcon,
  RefreshIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Dispatch, SetStateAction, useState } from "react";
import { Customer, Address } from "../lib/customer";
import { Item, Order } from "../lib/item";
import { OrderRequestBody } from "../lib/useDominos";

export default function OrderBuilder({
  storeID,
  customer,
  address,
  items,
  setItems,
  order,
  setOrder,
}: {
  storeID: string;
  customer: Customer;
  address: Address;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
}): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function validateOrder() {
    setIsLoading(true);
    // Validate item with domino's API
    const body: OrderRequestBody = {
      storeID: storeID,
      customer: customer,
      address: address,
      items: items.map<Item>((item) => {
        // Strip items of validation stuff
        return {
          code: item.code,
          options: item.options,
        };
      }),
    };
    const result = await fetch(`/api/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await result.json();
    console.log(json);
    if (json["status"] && json["status"] != -1) {
      setOrder(json as Order);
      setErrorMessage("");
    } else {
      setOrder({} as Order);
      setErrorMessage("Error validating order");
    }
    setIsLoading(false);
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
                  setOrder({} as Order);
                  setItems(
                    items.filter((i) => {
                      return i.iD != item.iD;
                    })
                  );
                }}
              />
              <div className="w-full flex flex-col bg-gray-100 rounded-xl p-3">
                <p>{item.name}</p>
                <p>
                  {item.descriptions[0].value.replace("Robust Inspired", "")}
                </p>
              </div>
            </div>
          );
        })}
        {!isLoading && !order.orderID && (
          <button
            className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
            onClick={() => validateOrder()}
          >
            Validate Order
          </button>
        )}
        {!isLoading && order.orderID && !errorMessage && (
          <div className="w-full bg-green-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1">
            <CheckCircleIcon className="h-4 w-4 text-white" />
            Valid Order
          </div>
        )}
        {isLoading && (
          <div className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1">
            Loading
            <RefreshIcon className="h-4 w-4 animate-reverse-spin" />
          </div>
        )}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </>
  );
}
