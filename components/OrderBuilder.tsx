import { SearchIcon, ArrowDownIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Menu } from "../lib/menu";

export default function OrderBuilder({ storeID }: { storeID: string }) {
  const [menu, setMenu] = useState<Menu>();
  const [size, setSize] = useState<string>();
  const [topping, setTopping] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const fetchStoreMenu = async () => {
      if (!storeID) return;
      setMenu(undefined);
      setSize(undefined);
      setTopping(undefined);
      try {
        const result = await fetch(`/api/menu?storeID=${storeID}`, {
          method: "GET",
        });
        const data = await result.json();
        console.log(data.menu);
        setMenu(data.menu);
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

  async function validate() {
    const result = await fetch(`/api/validate?storeID=${storeID}`, {
      method: "GET",
    });
    console.log(result);
  }

  console.log(Object.keys(menu.sizes.pizza));
  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-1">
        <p>Create Pizza</p>
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
        <p className="text-sm">Topping</p>
        <select
          className="bg-gray-100 rounded-xl px-3 py-1 w-full text-sm appearance-none"
          onChange={(event) => {
            setTopping(event.target.value);
          }}
        >
          <optgroup label="Sauces">
            {Object.keys(menu.toppings.pizza).map((key) => {
              const topping = menu.toppings.pizza[key];
              if (!topping.tags.sauce) return <></>;
              return (
                <option value={topping.code} key={topping.code}>
                  {topping.name}
                </option>
              );
            })}
          </optgroup>
          <optgroup label="Cheese">
            {Object.keys(menu.toppings.pizza).map((key) => {
              const topping = menu.toppings.pizza[key];
              if (topping.tags.meat || topping.tags.vege || topping.tags.sauce)
                return <></>;
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
              if (!topping.tags.vege) return <></>;
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
              if (!topping.tags.meat) return <></>;
              return (
                <option value={topping.code} key={topping.code}>
                  {topping.name}
                </option>
              );
            })}
          </optgroup>
        </select>
        {topping}_{size}SCREEN
        <button
          onClick={() => {
            validate();
          }}
        >
          Validate
        </button>
      </div>
    </>
  );
}
