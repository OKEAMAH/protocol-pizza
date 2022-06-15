import { Address } from "./customer";

export interface Order {
  address: Address;
  amounts: any;
  amountsBreakdown: AmountsBreakdown;
  businessDate: Date;
  coupons: any[];
  currency: string;
  customerID: string;
  estimatedWaitMinutes: string;
  email: string;
  extension: string;
  firstName: string;
  hotspotsLite: boolean;
  iP: string;
  lastName: string;
  languageCode: string;
  market: string;
  metaData: any;
  newUser: boolean;
  noCombine: boolean;
  orderChannel: string;
  orderID: string;
  orderInfoCollection: any[];
  orderMethod: string;
  orderTaker: string;
  partners: any;
  payments: any[];
  phone: string;
  phonePrefix: string;
  priceOrderMs: number;
  priceOrderTime: Date;
  products: Product[];
  promotions: any;
  pulseOrderGuid: string;
  serviceMethod: string;
  sourceOrganizationURI: string;
  storeID: string;
  tags: any;
  userAgent: string;
  version: string;
  status: number;
  pricingFlag: string;
}

export interface Product {
  iD: number;
  code: string;
  qty: number;
  options: Options;
  isNew: boolean;
  categoryCode: string;
  flavorCode: string;
  price: number;
  amount: number;
  status: number;
  likeProductID: number;
  name: string;
  needsCustomization: boolean;
  autoRemove: boolean;
  fulfilled: boolean;
  sideOptions: any[];
  tags: any;
  descriptions: Description[];
}
export interface AmountsBreakdown {
  foodAndBeverage: string;
  adjustment: string;
  surcharge: string;
  deliveryFee: string;
  tax: number;
  tax1: number;
  tax2: number;
  tax3: number;
  tax4: number;
  tax5: number;
  bottle: number;
  customer: number;
  roundingAdjustment: number;
  cash: number;
  savings: string;
}

export interface Item {
  iD?: number;
  code: string;
  qty?: number;
  options?: Options;
  isNew?: boolean;
  categoryCode?: string;
  flavorCode?: string;
  status?: number;
  likeProductID?: number;
  name?: string;
  needsCustomization?: boolean;
  autoRemove?: boolean;
  fulfilled?: boolean;
  sideOptions?: any[];
  tags?: any;
  descriptions?: Description[];
}

export interface Options {
  [key: string]: {
    [key: string]: number;
  };
}

export interface Description {
  portionCode: string;
  value: string;
}
