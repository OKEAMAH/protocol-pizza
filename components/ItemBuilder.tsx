import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Customer, Address } from "../lib/customer";
import { Menu } from "../lib/menu";
import { Item, Order } from "../lib/item";
import { PlusCircleIcon, RefreshIcon } from "@heroicons/react/solid";
import { OrderRequestBody } from "../lib/useDominos";

export default function ItemBuilder({
  storeID,
  customer,
  address,
  order,
  setOrder,
}: {
  storeID: string;
  customer: Customer;
  address: Address;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
}) {
  const [menu, setMenu] = useState<Menu>();
  const [size, setSize] = useState<string>();
  const [cheese, setCheese] = useState<boolean>(true);
  const [tomatoSauce, setTomatoSauce] = useState<boolean>(true);
  const [toppings, setToppings] = useState<string[]>([""]);
  const [_, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStoreMenu = async () => {
      if (!storeID) return;
      setMenu(undefined);
      setSize(undefined);
      setToppings([""]);
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

  if (!menu) {
    return (
      <div className="flex justify-center items-center mx-auto gap-1 text-gray-600">
        <p>Loading Menu</p>
        <RefreshIcon className="h-4 w-4 animate-reverse-spin" />
      </div>
    );
  }

  async function addItem() {
    setIsLoading(true);
    let items: Item[] = [];
    if (order.products) {
      items = order.products.map<Item>((product) => {
        return {
          code: product.code,
          options: product.options,
        };
      });
    }
    const newItem = makeDominosItem();
    items.push(newItem);
    // Validate item with domino's API
    const body: OrderRequestBody = {
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
      setOrder(json as Order);
    } else {
      setErrorMessage("Error validating item");
    }
    setIsLoading(false);
  }

  function makeDominosItem(): Item {
    let options: any = {
      C: 0,
      X: 0,
    };
    for (const topping of toppings) {
      if (topping) options[topping] = { "1/1": "1" };
    }
    if (cheese) options["C"] = { "1/1": "1" };
    if (tomatoSauce) options["X"] = { "1/1": "1" };
    return {
      code: `${size}SCREEN`,
      qty: 1,
      options: options,
    };
  }

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Build Your Pizza</p>
        <div>
          <p className="text-sm mb-1">Default Toppings</p>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={cheese}
              onChange={(event) => {
                setCheese(event.target.checked);
              }}
            />
            <p className="text-sm">Cheese</p>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={tomatoSauce}
              onChange={(event) => {
                setTomatoSauce(event.target.checked);
              }}
            />
            <p className="text-sm">Tomato Sauce</p>
          </div>
        </div>
        <div>
          <p className="text-sm mb-1">Size</p>
          <div className="flex flex-col content-center text-sm">
            {Object.keys(menu.sizes.pizza).map((key) => {
              const sizeItem = menu.sizes.pizza[key];
              return (
                <div key={sizeItem.code}>
                  <label className="flex content-center gap-1">
                    <input
                      type="radio"
                      checked={size == sizeItem.code}
                      onChange={() => {
                        setSize(sizeItem.code);
                      }}
                    />
                    <p className="my-auto">{sizeItem.name}</p>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-sm mb-1">Toppings</p>
          <div className="flex flex-col gap-1">
            {toppings.map((topping, index) => {
              return (
                <select
                  className="bg-gray-100 rounded-xl px-3 py-1 w-full text-sm appearance-none"
                  value={topping}
                  key={index}
                  onChange={(event) => {
                    let newToppings = [...toppings];
                    newToppings[index] = event.target.value;
                    // Clear blanks
                    newToppings = newToppings.filter((t) => t != "");
                    // Add blank to end
                    newToppings.push("");
                    console.log(newToppings);
                    setToppings(newToppings);
                  }}
                >
                  <option value={""}>None</option>
                  <optgroup label="Sauces">
                    {Object.keys(menu.toppings.pizza).map((key) => {
                      const topping = menu.toppings.pizza[key];
                      if (!topping.tags.sauce || topping.code == "X") return;
                      return (
                        <option value={topping.code} key={topping.code}>
                          {topping.name}
                        </option>
                      );
                    })}
                  </optgroup>
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
              );
            })}
          </div>
        </div>
        {!isLoading && (
          <button
            className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
            onClick={() => addItem()}
          >
            Add to Order
            <PlusCircleIcon className="h-4 w-4 text-white" />
          </button>
        )}
        {isLoading && (
          <div
            className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
            onClick={() => addItem()}
          >
            Loading
            <RefreshIcon className="h-4 w-4 animate-reverse-spin" />
          </div>
        )}
      </div>
    </>
  );
}
