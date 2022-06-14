import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Customer } from "../lib/customer";
import { validateCustomer } from "../lib/validate";

export default function CustomerBuilder({
  customer,
  setCustomer,
  setCustomerIsValid
}: {
  customer: Customer;
  setCustomer: Dispatch<SetStateAction<Customer>>;
  setCustomerIsValid: Dispatch<SetStateAction<boolean>>;
}) {
  const [errors, setErrors] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  useEffect(() => {
    const newErrors = validateCustomer(customer);
    setErrors(newErrors);
    if (newErrors.size == 0) {
      setCustomerIsValid(true);
    } else {
      setCustomerIsValid(false);
    }
  }, [customer.firstName, customer.lastName, customer.phone, customer.email]);

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Contact Info</p>
        <div className="flex flex-row gap-2">
          <input
            className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
              errors.get("firstName") ? " border border-red-500" : ""
            )}
            placeholder="First Name"
            onChange={(event) => {
              setCustomer((customer) => ({
                ...customer,
                firstName: event.target.value,
              }));
            }}
          ></input>
          <input
            className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
              errors.get("lastName") ? " border border-red-500" : ""
            )}
            placeholder="Last Name"
            onChange={(event) => {
              setCustomer((customer) => ({
                ...customer,
                lastName: event.target.value,
              }));
            }}
          ></input>
        </div>
        <input
          className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
            errors.get("phone") ? " border border-red-500" : ""
          )}
          placeholder="Phone Number"
          onChange={(event) => {
            setCustomer((customer) => ({
              ...customer,
              phone: event.target.value,
            }));
          }}
        ></input>
        <input
          className={"bg-gray-100 rounded-xl px-3 py-1 w-full ".concat(
            errors.get("email") ? " border border-red-500" : ""
          )}
          placeholder="Email"
          onChange={(event) => {
            setCustomer((customer) => ({
              ...customer,
              email: event.target.value,
            }));
          }}
        ></input>
      </div>
    </>
  );
}
