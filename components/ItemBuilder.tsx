import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Customer, Address } from "../lib/customer";
import { Menu } from "../lib/menu";
import { ValidateRequestBody } from "../pages/api/validate";
import { Item } from "../lib/item";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { PlusCircleIcon } from "@heroicons/react/solid";

export default function ItemBuilder({
  storeID,
  customer,
  address,
  items,
  setItems,
  setOrderIsValid,
}: {
  storeID: string;
  customer: Customer;
  address: Address;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  setOrderIsValid: Dispatch<SetStateAction<boolean>>;
}) {
  const [menu, setMenu] = useState<Menu>();
  const [size, setSize] = useState<string>();
  const [cheese, setCheese] = useState<boolean>(false);
  const [sauce, setSauce] = useState<string>("");
  const [topping, setTopping] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();

  // TODO: Add loading during this fetch
  useEffect(() => {
    const fetchStoreMenu = async () => {
      if (!storeID) return;
      setMenu(undefined);
      setSize(undefined);
      setSauce("");
      setTopping("");
      try {
        const result = await fetch(`/api/menu?storeID=${storeID}`, {
          method: "GET",
        });
        const data = await result.json();
        console.log(data.menu);
        setMenu(data.menu);
        if (data.menu) {
          const firstSize = Object.keys(data.menu.sizes.pizza)[0];
          setSize(data.menu.sizes.pizza[firstSize].code);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("Error, view console for details");
      }
    };

    fetchStoreMenu();
  }, [storeID]);

  if (!menu || !storeID) {
    return <></>;
  }

  async function addItem() {
    const item = makeDominosItem();

    // Validate item with domino's API
    const body: ValidateRequestBody = {
      storeID: storeID,
      customer: customer,
      address: address,
      items: [item],
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
      // Add item to items
      setOrderIsValid(false);
      setItems([...items, json.products[0] as Item]);
    } else {
      setErrorMessage("Error validating item");
    }
  }

  function makeDominosItem(): Item {
    var options: any = {};
    if (sauce) options[sauce] = { "1/1": "1" };
    if (topping) options[topping] = { "1/1": "1" };
    if (cheese) options["C"] = { "1/1": "1" };
    return {
      code: `${size}SCREEN`,
      qty: 1,
      options: options,
    };
  }

  const sauces = Object.keys(menu.toppings.pizza).filter((key) => {
    const topping = menu.toppings.pizza[key];
    if (topping.tags.sauce) return true;
  });

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Create Pizza</p>
        <div>
          <p className="text-sm">Size</p>
          <select
            className="bg-gray-100 rounded-xl px-3 py-1 w-full text-sm appearance-none"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          >
            {Object.keys(menu.sizes.pizza).map((key) => {
              const size = menu.sizes.pizza[key];
              return (
                <option value={size.code} key={size.code}>
                  {size.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p className="text-sm">Sauce</p>
          <select
            className="bg-gray-100 rounded-xl px-3 py-1 w-full text-sm appearance-none"
            value={sauce}
            onChange={(event) => {
              setSauce(event.target.value);
            }}
          >
            <option value={""}>None</option>
            {sauces.map((key) => {
              const topping = menu.toppings.pizza[key];
              return (
                <option key={topping.code} value={topping.code}>
                  {topping.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* TODO: STYLE */}
        <div className="flex items-center gap-1">
          <p className="text-sm">Cheese:</p>
          <input
            type="checkbox"
            checked={cheese}
            onChange={(event) => {
              setCheese(event.target.checked);
            }}
          />
        </div>
        <div>
          <p className="text-sm">Topping</p>
          <select
            className="bg-gray-100 rounded-xl px-3 py-1 w-full text-sm appearance-none"
            value={topping}
            onChange={(event) => {
              setTopping(event.target.value);
            }}
          >
            <option value={""}>None</option>
            <optgroup label="Veggies">
              {Object.keys(menu.toppings.pizza).map((key) => {
                const topping = menu.toppings.pizza[key];
                if (!topping.tags.vege) return;
                return (
                  <option value={topping.code} key={topping.code}>
                    {topping.name}
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Meat">
              {Object.keys(menu.toppings.pizza).map((key) => {
                const topping = menu.toppings.pizza[key];
                if (!topping.tags.meat) return;
                return (
                  <option value={topping.code} key={topping.code}>
                    {topping.name}
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Other">
              {Object.keys(menu.toppings.pizza).map((key) => {
                const topping = menu.toppings.pizza[key];
                if (
                  topping.tags.meat ||
                  topping.tags.vege ||
                  topping.tags.sauce ||
                  topping.tags.cheese
                )
                  return;
                return (
                  <option value={topping.code} key={topping.code}>
                    {topping.name}
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>
        <button
          className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
          onClick={() => addItem()}
        >
          <PlusCircleIcon className="h-4 w-4 text-white" />
          Add to Order
        </button>
      </div>
    </>
  );
}
