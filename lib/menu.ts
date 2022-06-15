export interface Menu {
  categories: any;
  coupons: any;
  flavors: Flavors;
  products: Product;
  sides: any;
  sizes: Sizes;
  toppings: Toppings;
  variants: any;
  preconfiguredProducts: any;
  shortProductDescriptions: any;
  unsupported: any;
  cooking: any;
}

export interface Coupon {
  code: string;
  couponTierThreshold: number;
  couponTierPercentOff: number;
  name: string;
  description: string;
  serviceMethod: string;
}

export interface Product {
  code: string;
  imageCode: string;
  description: string;
  name: string;
  price: string;
  tags: ProductTags;
  local: boolean;
  bundle: boolean;
}

export interface ProductTags {
  validServiceMethods: string[];
  combine?: string;
  serviceMethods?: string;
  "101T"?: boolean;
  oZ?: boolean;
  effectiveOn?: Date;
  lSO_L3T?: boolean;
  m1T?: boolean;
  multiSame?: boolean;
  showBestPriceMessage?: boolean;
  combinedSizeAndCrust?: boolean;
  bonusProductQty?: string;
  onFulFilledUpsellCoupon?: string;
  noPulseDefaults?: boolean;
  wizardUpsells?: string[];
  "'LinkText':'Upgrade for only $3 more'"?: boolean;
  "'CouponCode':'9223'}}"?: boolean;
  "'CouponCode':'9224'}}"?: boolean;
}

export interface ShortDescription {
  code: string;
  description: string;
}

export interface Flavors {
  breadDipCombos: any;
  pasta: any;
  pizza: any;
  wings: { [key: string]: MenuItem };
}

export interface MenuItem {
  code: string;
  description: string;
  local: boolean;
  name: string;
  sortSeq: string;
  defaultPriority?: any;
}

export interface Sizes {
  bread: { [key: string]: MenuItem };
  cHARGES: any;
  dessert: { [key: string]: MenuItem };
  drinks: { [key: string]: MenuItem };
  pizza: { [key: string]: MenuItem };
  wings: { [key: string]: MenuItem };
}
export interface Toppings {
  bread: { [key: string]: Topping };
  pasta: { [key: string]: Topping };
  pizza: { [key: string]: Topping };
  sandwich: { [key: string]: Topping };
  wings: { [key: string]: Topping };
}

export interface Topping {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: Tags;
}

export interface Tags {
  wholeOnly: boolean;
  ignoreQty: boolean;
  exclusiveGroup?: string;
  sauce: boolean;
  nonMeat: boolean;
  vege?: boolean;
  meat?: boolean;
  cheese?: boolean;
}
