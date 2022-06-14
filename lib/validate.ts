import { Address, Customer } from "./customer";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function validateCustomer(customer: Customer): Map<string, string> {
  const newErrors = new Map<string, string>();
  if (!customer.firstName || customer.firstName.length == 0) {
    newErrors.set("firstName", "missing");
  }

  if (!customer.lastName || customer.lastName.length == 0) {
    newErrors.set("lastName", "missing");
  }

  if (!customer.phone || customer.phone.length == 0) {
    newErrors.set("phone", "missing");
  } else {
    let validPhone = false;
    try {
      const number = phoneUtil.parse(customer.phone, "US");
      validPhone = phoneUtil.isValidNumber(number);
    } catch {
      validPhone = false;
    }
    if (!validPhone) newErrors.set("phone", "Invalid phone number");
  }

  // TODO: Email validation
  if (!customer.email || customer.email.length == 0) {
    newErrors.set("email", "missing");
  }

  return newErrors;
}

// TODO: Use some address validation library?
export function validateAddress(address: Address): Map<string, string> {
  const newErrors = new Map<string, string>();
  if (!address.street || address.street.length == 0) {
    newErrors.set("street", "missing");
  }

  if (!address.city || address.city.length == 0) {
    newErrors.set("city", "missing");
  }

  if (!address.region || address.region.length == 0) {
    newErrors.set("region", "missing");
  }

  if (!address.postalCode || address.postalCode.length == 0) {
    newErrors.set("postalCode", "missing");
  }

  return newErrors;
}
