export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  Address: Address;
  phone: string;
}

export interface Address {
  street: string;
  streetNumber: string;
  streetName: string;
  unitType: string;
  unitNumber: string;
  city: string;
  region: string;
  postalCode: string;
  deliveryInstructions: string;
}
