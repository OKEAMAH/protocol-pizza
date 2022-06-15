import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address } from "../lib/customer";
import { validateAddress } from "../lib/validate";

export default function AddressBuilder({
  address,
  setAddress,
  setAddressIsValid,
}: {
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>;
  setAddressIsValid: Dispatch<SetStateAction<boolean>>;
}) {
  const [errors, setErrors] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  useEffect(() => {
    const newErrors = validateAddress(address);
    setErrors(newErrors);
    if (newErrors.size == 0) {
      setAddressIsValid(true);
    } else {
      setAddressIsValid(false);
    }
  }, [address, setAddressIsValid]);

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Delivery Address</p>
        <input
          className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
            errors.get("street") ? " border border-red-500" : ""
          )}
          placeholder="Street"
          onChange={(event) => {
            setAddress((address) => ({
              ...address,
              street: event.target.value,
            }));
          }}
        ></input>
        <input
          className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
            errors.get("city") ? " border border-red-500" : ""
          )}
          placeholder="City"
          onChange={(event) => {
            setAddress((address) => ({
              ...address,
              city: event.target.value,
            }));
          }}
        ></input>
        <div className="flex flex-row gap-2">
          <input
            className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
              errors.get("region") ? " border border-red-500" : ""
            )}
            placeholder="State/Region"
            onChange={(event) => {
              setAddress((address) => ({
                ...address,
                region: event.target.value,
              }));
            }}
          ></input>
          <input
            className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
              errors.get("postalCode") ? " border border-red-500" : ""
            )}
            placeholder="Postal Code"
            onChange={(event) => {
              setAddress((address) => ({
                ...address,
                postalCode: event.target.value,
              }));
            }}
          ></input>
        </div>
      </div>
    </>
  );
}
