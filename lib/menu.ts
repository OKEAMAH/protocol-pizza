export interface Welcome {
  menu: Menu;
}

export interface Menu {
  categories: Categories;
  coupons: MenuCoupons;
  flavors: Flavors;
  products: MenuProducts;
  sides: Sides;
  sizes: Sizes;
  toppings: Toppings;
  variants: Variants;
  preconfiguredProducts: MenuPreconfiguredProducts;
  shortProductDescriptions: { [key: string]: ShortDescription };
  unsupported: Unsupported;
  cooking: Cooking;
}

export interface Categories {
  food: { [key: string]: All };
  coupons: CategoriesCoupons;
  couponsByProduct: CouponsByProduct;
  preconfiguredProducts: CategoriesPreconfiguredProducts;
}

export interface CategoriesCoupons {
  feeds1To2: All;
  feeds3To5: All;
  feeds6Plus: All;
  lunchOffers: All;
  all: All;
  allStoreCoupons: All;
}

export interface GroupOrderingSubCategories {
  groupOrderingPizza: All;
  groupOrderingChicken: All;
  groupOrderingBread: All;
  groupOrderingDessert: All;
  groupOrderingDrink: All;
}

export interface GroupOrdering {
  code: string;
  name: string;
  description: string;
  hasSubCategories: boolean;
  subCategories?: GroupOrderingSubCategories;
  hasProducts: boolean;
  hasTags: boolean;
  products?: string[];
}

export interface AllSubCategories {
  buildYourOwn?: All;
  artisan?: All;
  specialty?: All;
  slice?: All;
  sandwich?: All;
  hoagie?: All;
  popularItemsPizza?: GroupOrdering;
  popularItemsSandwichesSidesDesserts?: GroupOrdering;
}

export interface All {
  code: string;
  name: string;
  hasSubCategories: boolean;
  hasProducts: boolean;
  products?: string[];
  hasTags: boolean;
  subCategories?: AllSubCategories;
  description?: string;
}

export interface CouponsByProduct {
  couponPizza: All;
  couponDessert: All;
  couponDrinks: All;
  couponBread: All;
  couponWings: All;
  couponSandwich: All;
  couponPasta: All;
  couponGSalad: All;
  couponSides: All;
}

export interface CategoriesPreconfiguredProducts {
  groupOrdering: GroupOrdering;
  popularItems: All;
}

export interface Cooking {
  instructions: Instructions;
  instructionGroups: InstructionGroups;
}

export interface InstructionGroups {
  BAKE: Bake;
  SEASONING: Bake;
  CUT: Cut;
}

export interface Bake {
  code: string;
  name: string;
  tags: BAKETags;
}

export interface BAKETags {}

export interface Cut {
  code: string;
  name: string;
  tags: CUTTags;
}

export interface CUTTags {
  maxOptions: string;
}

export interface Instructions {
  WD: Go;
  NB: Go;
  GO: Go;
  NGO: Go;
  RGO: Go;
  PIECT: Go;
  SQCT: Go;
  UNCT: Go;
  NOOR: Go;
}

export interface Go {
  code: string;
  name: string;
  description: string;
  group: string;
}

export interface MenuCoupons {
  products: { [key: string]: Product };
  shortCouponDescriptions: { [key: string]: ShortDescription };
  couponTiers: CouponTiers;
}

export interface CouponTiers {
  multiplePizzaC: MultiplePizza;
  multiplePizza: MultiplePizza;
}

export interface MultiplePizza {
  code: CodeElement;
  coupons: { [key: string]: Coupon };
}

export enum CodeElement {
  MultiplePizza = "MultiplePizza",
  MultiplePizzaB = "MultiplePizzaB",
  MultiplePizzaC = "MultiplePizzaC",
  MultiplePizzaD = "MultiplePizzaD",
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
  description: Description;
  name: string;
  price: string;
  tags: ProductTags;
  local: boolean;
  bundle: boolean;
}

export enum Description {
  Empty = "",
  The1Large1ToppingBrooklynStylePizza = "1 Large 1 Topping Brooklyn Style Pizza",
}

export interface ProductTags {
  validServiceMethods: ServiceMethods[];
  combine?: Combine;
  serviceMethods?: ServiceMethods;
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

export enum Combine {
  Complementary = "Complementary",
  Exclusive = "Exclusive",
}

export enum ServiceMethods {
  Carryout = "Carryout",
  Carside = "Carside",
  Delivery = "Delivery",
  Hotspot = "Hotspot",
}

export interface ShortDescription {
  code: string;
  description: string;
}

export interface Flavors {
  breadDipCombos: BreadDIPCombos;
  pasta: FlavorsPasta;
  pizza: FlavorsPizza;
  wings: { [key: string]: Act };
}

export interface BreadDIPCombos {
  FCGT: Act;
  FCPT: Act;
  CMGT: Act;
  CMPT: Act;
  ACT: Act;
}

export interface Act {
  code: string;
  description: string;
  local: boolean;
  name: string;
  sortSeq: string;
  defaultPriority?: DefaultPriority;
}

export enum DefaultPriority {
  Empty = "",
  The01 = "01",
  The07 = "07",
}

export interface FlavorsPasta {
  PASTA: Act;
  BBOWL: Act;
}

export interface FlavorsPizza {
  HANDTOSS: Act;
  NPAN: Act;
  THIN: Act;
  BK: Act;
  GLUTENF: Act;
}

export interface MenuPreconfiguredProducts {
  "14SCREEN": The14_Screen;
  B32PBIT: The14_Scextrav;
  B8PCSCB: The14_Scextrav;
  P_14SCREEN: The14_Scextrav;
  S_14SCREEN: The14_Scextrav;
  PS_14SCREEN: The14_Scextrav;
  HN_14SCREEN: The14_Scextrav;
  PM_14SCREEN: The14_Scextrav;
  P12IPAZA: The14_Screen;
  P_P12IPAZA: The14_Scextrav;
  P_P10IGFZA: The14_Screen;
  MARBRWNE: The14_Scextrav;
  "14SCEXTRAV": The14_Scextrav;
  P14ITHPV: The14_Screen;
  "2LCOKE": The14_Scextrav;
  "2LDCOKE": The14_Scextrav;
  "2LSPRITE": The14_Scextrav;
  XC_14SCREEN: The14_Scextrav;
  PXC_14SCREEN: The14_Scextrav;
  HNXC_12SCREEN: The14_Scextrav;
  MPXC_12SCREEN: The14_Scextrav;
  XCFeCsCpRMORrSiTd_P12IREPV: The14_Scextrav;
  RdCKDuPv_PSANSACB: The14_Scextrav;
  XfDu_PINPASCA: The14_Scextrav;
  SIDRAN_W08PBBQW: The14_Scextrav;
  B3PCLAVA: The14_Scextrav;
}

export interface The14_Scextrav {
  code: string;
  description: string;
  name: string;
  size: string;
  options: string;
  referencedProductCode: string;
  tags: BAKETags;
}

export interface The14_Screen {
  code: string;
  description: string;
  name: string;
  size: string;
  options: string;
  referencedProductCode: string;
  tags: PP10IGFZATags;
}

export interface PP10IGFZATags {
  banner: string;
}

export interface MenuProducts {
  F_PARMT: FAppledip;
  F_GARLICT: FAppledip;
  F_SCBRD: FLava;
  F_SBBRD: FLava;
  F_PBITES: FLava;
  P_FVCHPAIR: Pair;
  P_MARPAIR: Pair;
  P_APPCINPAIR: PAppcinpair;
  F_CINNAT: FAppledip;
  F_MRBRWNE: FAppledip;
  F_LAVA: FLava;
  F_MARDIP: FAppledip;
  F_FVCHEDIP: FAppledip;
  F_APPLEDIP: FAppledip;
  F_COKE: FCoke;
  F_DIET: FCoke;
  F_DRPEPPER: FCoke;
  F_ORAN: FCoke;
  F_SPRITE: FCoke;
  F_WATER: FCoke;
  F_GARDEN: FAppledip;
  F_CCAESAR: FAppledip;
  S_BUILD: SAlfr;
  S_ALFR: SAlfr;
  S_CARB: SAlfr;
  S_MARIN: SAlfr;
  S_PRIM: SAlfr;
  S_DX: SDx;
  S_MX: SDx;
  S_PIZBP: SDx;
  S_PIZCK: SDx;
  S_PIZCR: SDx;
  S_PIZCZ: SDx;
  S_PIZPH: SDx;
  S_PIZPV: SDx;
  S_PIZPX: SDx;
  S_PIZUH: SDx;
  S_PIZZA: SDx;
  S_ZZ: SDx;
  S_PISPF: SDx;
  S_CHIKK: SAlfr;
  S_CHIKP: SAlfr;
  S_ITAL: SAlfr;
  S_PHIL: SAlfr;
  S_BUFC: SAlfr;
  S_CHHB: SAlfr;
  S_MEDV: SAlfr;
  F_SIDPAR: FAppledip;
  F_SIDRED: FAppledip;
  F_CAESAR: FAppledip;
  F_RANCHPK: FAppledip;
  F_HOTCUP: FAppledip;
  F_SMHAB: FAppledip;
  F_BBQC: FAppledip;
  F_SIDRAN: FAppledip;
  F_Bd: FAppledip;
  F_SIDGAR: FAppledip;
  F_SIDICE: FAppledip;
  F_SIDMAR: FAppledip;
  F_STJUDE: FAppledip;
  F_BALVIN: FAppledip;
  S_BONELESS: SBbqw;
  S_HOTWINGS: SBbqw;
  S_BBQW: SBbqw;
  S_MILDWING: SBbqw;
  S_PLNWINGS: SBbqw;
  S_SMANG: SBbqw;
  S_GPRMWING: SBbqw;
  S_SCCBT: SSc;
  S_SCCHB: SSc;
  S_SCSJP: SSc;
  S_SCSBBQ: SSc;
}

export interface FAppledip {
  availableToppings: string;
  availableSides: AvailableSides;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: string;
  tags: BAKETags;
  variants: string[];
}

export enum AvailableSides {
  CaesarBalvinRanchpk = "CAESAR,BALVIN,RANCHPK",
  Empty = "",
  SIDMARSIDGARSIDRANBdBBQCHOTCUPSMHAB = "SIDMAR,SIDGAR,SIDRAN,Bd,BBQC,HOTCUP,SMHAB",
  Sidice = "SIDICE",
}

export interface FCoke {
  availableToppings: string;
  availableSides: string;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: string;
  tags: FCOKETags;
  variants: string[];
}

export interface FCOKETags {
  defaultVariant: string;
}

export interface FLava {
  availableToppings: string;
  availableSides: AvailableSides;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: string;
  tags: FLAVATags;
  variants: string[];
}

export interface FLAVATags {
  bazaarVoice: boolean;
}

export interface PAppcinpair {
  availableToppings: string;
  availableSides: string;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: string;
  tags: PAPPCINPAIRTags;
  variants: string[];
}

export interface PAPPCINPAIRTags {
  parentProduct: string;
}

export interface Pair {
  availableToppings: string;
  availableSides: string;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: string;
  tags: PFVCHPAIRTags;
  variants: string[];
}

export interface PFVCHPAIRTags {
  parentProduct: string;
  defaultVariant: string;
}

export interface SAlfr {
  availableToppings: string;
  availableSides: string;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: SALFRProductType;
  tags: SALFRTags;
  variants: string[];
}

export enum SALFRProductType {
  Pasta = "Pasta",
  Sandwich = "Sandwich",
}

export interface SALFRTags {
  optionQtys: string[];
  maxOptionQty: string;
  isDisplayedOnMakeline: boolean;
  bazaarVoice?: boolean;
  maxSauceQty?: string;
  sauceRequired?: boolean;
}

export interface SBbqw {
  availableToppings: string;
  availableSides: string;
  code: string;
  defaultToppings: string;
  defaultSides: SBBQWDefaultSides;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: string;
  tags: SBBQWTags;
  variants: string[];
}

export enum SBBQWDefaultSides {
  Bd1 = "Bd=1",
  Bd2 = "Bd=2",
  Bd4 = "Bd=4",
  Sidran1 = "SIDRAN=1",
}

export interface SBBQWTags {
  optionQtys: string[];
  maxOptionQty: string;
  isDisplayedOnMakeline: boolean;
  bundleBuilderProducts?: boolean;
  wings?: boolean;
  effectiveOn: Date;
  bvCode: string;
  bazaarVoice: boolean;
  boneless?: boolean;
}

export interface SDx {
  availableToppings: string;
  availableSides: string;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: SDXProductType;
  tags: SDXTags;
  variants: string[];
}

export enum SDXProductType {
  Pizza = "Pizza",
}

export interface SDXTags {
  optionQtys: string[];
  maxOptionQty: string;
  partCount: string;
  needsCustomization: boolean;
  couponTier: CodeElement[];
  isDisplayedOnMakeline: boolean;
  bazaarVoice?: boolean;
  sodiumWarningEnabled?: boolean;
}

export interface SSc {
  availableToppings: string;
  availableSides: string;
  code: string;
  defaultToppings: string;
  defaultSides: string;
  description: string;
  imageCode: string;
  local: boolean;
  name: string;
  productType: string;
  tags: SSCCBTTags;
  variants: string[];
}

export interface SSCCBTTags {
  optionQtys: string[];
  maxOptionQty: string;
  isDisplayedOnMakeline: boolean;
  specialtyChicken: boolean;
  promotion: string;
  promotionType: string;
}

export interface Sides {
  bread: SidesBread;
  dessert: Dessert;
  gSalad: GSalad;
  wings: SidesWings;
}

export interface SidesBread {
  SIDMAR: BdClass;
  SIDGAR: BdClass;
  SIDRAN: BdClass;
  Bd: BdClass;
  BBQC: BdClass;
  HOTCUP: BdClass;
  SMHAB: BdClass;
}

export interface BdClass {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: HOTCUPTags;
}

export interface HOTCUPTags {
  side: boolean;
}

export interface Dessert {
  SIDICE: BdClass;
}

export interface GSalad {
  CAESAR: BdClass;
  BALVIN: BdClass;
  RANCHPK: BdClass;
}

export interface SidesWings {
  HOTCUP: BdClass;
  SMHAB: PurpleBbqc;
  BBQC: PurpleBbqc;
  SIDRAN: BdClass;
  Bd: BdClass;
}

export interface PurpleBbqc {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: PurpleTags;
}

export interface PurpleTags {
  side: boolean;
  effectiveOn: Date;
}

export interface Sizes {
  bread: { [key: string]: Act };
  cHARGES: CHARGES;
  dessert: { [key: string]: Act };
  drinks: { [key: string]: Act };
  pizza: { [key: string]: Act };
  wings: { [key: string]: Act };
}

export interface CHARGES {
  CHGONE: Act;
}

export interface Toppings {
  bread: { [key: string]: Topping };
  pasta: { [key: string]: Topping };
  pizza: { [key: string]: Topping };
  sandwich: { [key: string]: Topping };
  wings: { [key: string]: Topping };
}

export interface ToppingsBread {
  K: K;
  J: FClass;
}

export interface FClass {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: FTags;
}

export interface FTags {
  vege: boolean;
  nonMeat: boolean;
}

export interface K {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: ATags;
}

export interface ATags {
  meat: boolean;
}

export interface ToppingsPasta {
  Xf: any;
  Xm: any;
  P: K;
  S: K;
  B: K;
  Pm: K;
  H: K;
  K: K;
  Du: K;
  A: K;
  C: C;
  E: C;
  Fe: C;
  Cs: C;
  Cp: C;
  F: FClass;
  G: FClass;
  J: FClass;
  M: FClass;
  N: FClass;
  O: FClass;
  R: FClass;
  Rr: FClass;
  Si: FClass;
  Td: FClass;
  Z: FClass;
}

export interface C {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: FluffyTags;
}

export interface FluffyTags {
  cheese: boolean;
  nonMeat: boolean;
}

export interface Topping {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: XfTags;
}

export interface XfTags {
  wholeOnly: boolean;
  ignoreQty: boolean;
  exclusiveGroup?: string;
  sauce: boolean;
  nonMeat: boolean;
  vege?: boolean;
  meat?: boolean;
  cheese?: boolean;
}

export interface AC {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: ACTags;
}

export interface ACTags {
  nonMeat: boolean;
}

export interface Cp {
  availability: any[];
  code: HideOptionEnum;
  description: string;
  local: boolean;
  name: string;
  tags: TentacledTags;
}

export enum HideOptionEnum {
  Cp = "Cp",
}

export interface TentacledTags {
  nonMeat: boolean;
  baseOptionQty: string;
}

export interface Sandwich {
  X: any;
  Mh: any;
  Bd: any;
  Rd: any;
  Ht: any;
  C: AC;
  P: K;
  Pm: K;
  H: K;
  K: K;
  Sa: K;
  Du: K;
  Ac: AC;
  E: AC;
  Fe: AC;
  Cs: AC;
  Pv: AC;
  Z: FClass;
  G: FClass;
  J: FClass;
  M: FClass;
  N: FClass;
  O: FClass;
  Rr: FClass;
  Si: FClass;
  Td: FClass;
}

export interface ToppingsWings {
  K: WingsK;
  Td: WingsJ;
  J: WingsJ;
  N: WingsJ;
}

export interface WingsJ {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: StickyTags;
}

export interface StickyTags {
  vege: boolean;
  nonMeat: boolean;
  side: boolean;
}

export interface WingsK {
  availability: any[];
  code: string;
  description: string;
  local: boolean;
  name: string;
  tags: IndigoTags;
}

export interface IndigoTags {
  meat: boolean;
  side: boolean;
}

export interface Unsupported {
  products: UnsupportedProducts;
  options: Options;
}

export interface Options {
  Fe: Fe;
  SIDICE: Fe;
  SIDGAR: Fe;
  SIDMAR: Fe;
  Si: Fe;
}

export interface Fe {
  pulseCode: string;
  description: string;
}

export interface UnsupportedProducts {
  _SIDCUPS: Fe;
  PINPASBA: Fe;
  PINBBLBA: Fe;
  PINPASBM: Fe;
  _SIDPLTS: Fe;
  PINBBLBM: Fe;
}

export interface Variants {
  B8PCPT: B8PC;
  B8PCGT: B8PC;
  B8PCSCB: B8PC;
  B8PCSBJ: B8PC;
  B16PBIT: The20_Bcoke;
  B32PBIT: The20_Bcoke;
  FVCHEGT: Appcintw;
  FVCHEPT: Appcintw;
  CHEMARGT: Appcintw;
  CHEMARPT: Appcintw;
  APPCINTW: Appcintw;
  B8PCCT: B8PC;
  MARBRWNE: The20_Bcoke;
  B3PCLAVA: The20_Bcoke;
  CHEMARDIP: The20_Bcoke;
  "5CHEDIP": The20_Bcoke;
  BKAPPDIP: The20_Bcoke;
  "20BCOKE": The20_Bcoke;
  "20BDCOKE": The20_Bcoke;
  "20BDRPEP": The20_Bcoke;
  "20BORNG": The20_Bcoke;
  "20BSPRITE": The20_Bcoke;
  BOTTLWATER: The20_Bcoke;
  "2LCOKE": The20_Bcoke;
  "2LDCOKE": The20_Bcoke;
  "2LSPRITE": The20_Bcoke;
  PPSGARSA: The20_Bcoke;
  PPSCSRSA: The20_Bcoke;
  PINPASBD: PINBBLBDClass;
  PINPASCA: The20_Bcoke;
  PINPASCC: PINBBLCCClass;
  PINPASMM: The20_Bcoke;
  PINPASPP: PINBBLCCClass;
  PINBBLBD: PINBBLBDClass;
  PINBBLCA: The20_Bcoke;
  PINBBLCC: PINBBLCCClass;
  PINBBLMM: The10_Screen;
  PINBBLPP: PINBBLCCClass;
  "10SCDELUX": The10_Scdelux;
  "10SCMEATZA": The10_Scdelux;
  P10IREBP: The10_Scdelux;
  P10IRECK: The10_Scdelux;
  P10IRECR: The10_Scdelux;
  P10IRECZ: The10_Scdelux;
  P10IREPH: The10_Scdelux;
  P10IREPV: The10_Scdelux;
  "10SCPFEAST": The10_Scdelux;
  P10IREUH: The10_Scdelux;
  "10SCREEN": The10_Screen;
  "10SCEXTRAV": The10_Scdelux;
  "12SCDELUX": The10_Scdelux;
  "12SCMEATZA": The10_Scdelux;
  P12IREBP: The10_Scdelux;
  P12IRECK: The10_Scdelux;
  P12IRECR: The10_Scdelux;
  P12IRECZ: The10_Scdelux;
  P12IREPH: The10_Scdelux;
  P12IREPV: The10_Scdelux;
  "12SCPFEAST": The10_Scdelux;
  P12IREUH: The10_Scdelux;
  "12SCREEN": The10_Screen;
  "12SCEXTRAV": The10_Scdelux;
  "12TDELUX": The10_Scdelux;
  "12TMEATZA": The10_Scdelux;
  P12ITHBP: The10_Scdelux;
  P12ITHCK: The10_Scdelux;
  P12ITHCR: The10_Scdelux;
  P12ITHCZ: The10_Scdelux;
  P12ITHPH: The10_Scdelux;
  P12ITHPV: The10_Scdelux;
  "12TPFEAST": The10_Scdelux;
  P12ITHUH: The10_Scdelux;
  "12THIN": The10_Screen;
  "12TEXTRAV": The10_Scdelux;
  PBKIREDX: P12Ipabp;
  PBKIREMX: P12Ipabp;
  P14IBKBP: P12Ipabp;
  P14IBKCK: P12Ipabp;
  P14IBKCR: P12Ipabp;
  P14IBKCZ: P12Ipabp;
  P14IBKPH: P12Ipabp;
  P14IBKPV: P12Ipabp;
  PBKIREPX: P12Ipabp;
  P14IBKUH: P12Ipabp;
  PBKIREZA: P12Ipabp;
  PBKIREZZ: P12Ipabp;
  "14SCDELUX": The10_Scdelux;
  "14SCMEATZA": The10_Scdelux;
  P14IREBP: The10_Scdelux;
  P14IRECK: The10_Scdelux;
  P14IRECR: The10_Scdelux;
  P14IRECZ: The10_Scdelux;
  P14IREPH: The10_Scdelux;
  P14IREPV: The10_Scdelux;
  "14SCPFEAST": The10_Scdelux;
  P14IREUH: The10_Scdelux;
  "14SCREEN": The10_Screen;
  "14SCEXTRAV": The10_Scdelux;
  "14TDELUX": The10_Scdelux;
  "14TMEATZA": The10_Scdelux;
  P14ITHBP: The10_Scdelux;
  P14ITHCK: The10_Scdelux;
  P14ITHCR: The10_Scdelux;
  P14ITHCZ: The10_Scdelux;
  P14ITHPH: The10_Scdelux;
  P14ITHPV: The10_Scdelux;
  "14TPFEAST": The10_Scdelux;
  P14ITHUH: The10_Scdelux;
  "14THIN": The10_Screen;
  "14TEXTRAV": The10_Scdelux;
  P10IGFDX: The10_Scdelux;
  P10IGFMX: The10_Scdelux;
  P10IGFBP: The10_Scdelux;
  P10IGFCK: The10_Scdelux;
  P10IGFCR: The10_Scdelux;
  P10IGFCZ: The10_Scdelux;
  P10IGFPH: The10_Scdelux;
  P10IGFPV: The10_Scdelux;
  P10IGFPX: The10_Scdelux;
  P10IGFUH: The10_Scdelux;
  P10IGFZA: The10_Screen;
  P10IGFZZ: The10_Scdelux;
  P12IPADX: P12Ipabp;
  P12IPAMX: P12Ipabp;
  P12IPABP: P12Ipabp;
  P12IPACK: P12Ipabp;
  P12IPACR: P12Ipabp;
  P12IPACZ: P12Ipabp;
  P12IPAPH: P12Ipabp;
  P12IPAPV: P12Ipabp;
  P12IPAPX: P12Ipabp;
  P12IPAUH: P12Ipabp;
  P12IPAZA: P12Ipaza;
  P12IPAZZ: P12Ipabp;
  P10IRESPF: The10_Scdelux;
  P10IGFSPF: The10_Scdelux;
  P12IRESPF: The10_Scdelux;
  P12ITHSPF: The10_Scdelux;
  P12IPASPF: P12Ipabp;
  P14IBKSPF: P12Ipabp;
  P14IRESPF: The10_Scdelux;
  P14ITHSPF: The10_Scdelux;
  PSANSACB: The20_Bcoke;
  PSANSACP: The20_Bcoke;
  PSANSAIT: The20_Bcoke;
  PSANSAPH: The20_Bcoke;
  PSANSABC: The20_Bcoke;
  PSANSACH: The20_Bcoke;
  PSANSAMV: The20_Bcoke;
  PARMCHEESE: The20_Bcoke;
  REDPEPPER: The20_Bcoke;
  AGCAESAR: The20_Bcoke;
  AGRANCH: The20_Bcoke;
  HOTSAUCE: Bluechs;
  CEAHABC: Bluechs;
  CEABBQC: Bluechs;
  RANCH: Bluechs;
  BLUECHS: Bluechs;
  GARBUTTER: Garbutter;
  ICING: Garbutter;
  MARINARA: Garbutter;
  STJUDE: Stjude;
  STJUDE2: Stjude;
  STJUDE5: Stjude;
  STJUDE10: Stjude;
  STJUDERU: Stjuderu;
  CEABVI: The20_Bcoke;
  W08PBNLW: Pbnlw;
  W08PHOTW: W06Pbbqw;
  W08PBBQW: W06Pbbqw;
  W08PMLDW: W06Pbbqw;
  W08PPLNW: W06Pbbqw;
  W08PMANW: W06Pbbqw;
  W08PGPMW: W06Pbbqw;
  W16PBNLW: Pbnlw;
  W16PHOTW: W06Pbbqw;
  W16PBBQW: W06Pbbqw;
  W16PMLDW: W06Pbbqw;
  W16PPLNW: W06Pbbqw;
  W16PMANW: W06Pbbqw;
  W16PGPMW: W06Pbbqw;
  W32PBNLW: Pbnlw;
  W32PHOTW: W06Pbbqw;
  W32PBBQW: W06Pbbqw;
  W32PMLDW: W06Pbbqw;
  W32PPLNW: W06Pbbqw;
  W32PMANW: W06Pbbqw;
  W32PGPMW: W06Pbbqw;
  CKRGCBT: Ckrg;
  CKRGHTB: Ckrg;
  CKRGSJP: Ckrg;
  CKRGSBQ: Ckrg;
  W06PHOTW: W06Pbbqw;
  W06PBBQW: W06Pbbqw;
  W06PMLDW: W06Pbbqw;
  W06PPLNW: W06Pbbqw;
  W06PMANW: W06Pbbqw;
  W06PGPMW: W06Pbbqw;
}

export interface The10_Scdelux {
  code: string;
  flavorCode: The10SCDELUXFlavorCode;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: The10SCDELUXTags;
  allowedCookingInstructions: AllowedCookingInstructions;
  defaultCookingInstructions: DefaultCookingInstructions;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export enum AllowedCookingInstructions {
  Empty = "",
  PiectSqctUnctRgoNoor = "PIECT,SQCT,UNCT,RGO,NOOR",
  WdNbPiectSqctUnct = "WD,NB,PIECT,SQCT,UNCT",
  WdNbPiectSqctUnctGoNgo = "WD,NB,PIECT,SQCT,UNCT,GO,NGO",
}

export enum DefaultCookingInstructions {
  Empty = "",
  NbPiect = "NB,PIECT",
  NbPiectGo = "NB,PIECT,GO",
  SqctRgo = "SQCT,RGO",
}

export enum The10SCDELUXFlavorCode {
  Bbowl = "BBOWL",
  Glutenf = "GLUTENF",
  Handtoss = "HANDTOSS",
  Thin = "THIN",
}

export interface Pricing {
  "price2-4": string;
  "price1-0": string;
  "price1-3": string;
  "price2-3": string;
  "price1-4": string;
  "price2-2": string;
  "price1-1": string;
  "price2-1": string;
  "price1-2": string;
  "price2-0": string;
}

export interface The10SCDELUXTags {
  specialty: boolean;
  defaultSides: string;
  defaultToppings: string;
}

export interface The10_Screen {
  code: string;
  flavorCode: The10SCDELUXFlavorCode;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: The10SCREENTags;
  allowedCookingInstructions: AllowedCookingInstructions;
  defaultCookingInstructions: DefaultCookingInstructions;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface The10SCREENTags {
  sodiumWarningEnabled: boolean;
  defaultSides: string;
  defaultToppings: string;
}

export interface The20_Bcoke {
  code: string;
  flavorCode: The20BCOKEFlavorCode;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: The20BCOKETags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export enum The20BCOKEFlavorCode {
  Bbowl = "BBOWL",
  Empty = "",
  Pasta = "PASTA",
}

export interface The20BCOKETags {
  defaultSides: PurpleDefaultSides;
  defaultToppings: string;
}

export enum PurpleDefaultSides {
  Caesar1 = "CAESAR=1",
  Empty = "",
  Ranchpk1 = "RANCHPK=1",
}

export interface Appcintw {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: APPCINTWTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface APPCINTWTags {
  parentProduct: string;
  defaultSides: string;
  defaultToppings: string;
  defaultVariant?: string;
}

export interface B8PC {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: B8PCCTTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface B8PCCTTags {
  breadType: string;
  defaultSides: string;
  defaultToppings: string;
}

export interface Bluechs {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: BLUECHSTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface BLUECHSTags {
  bONELESS: boolean;
  bONEIN: boolean;
  sideType: string;
  defaultSides: string;
  defaultToppings: string;
  effectiveOn?: Date;
}

export interface Ckrg {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: CKRGCBTTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface CKRGCBTTags {
  specialtyChicken: boolean;
  promotion: string;
  promotionType: string;
  defaultSides: string;
  defaultToppings: string;
}

export interface Garbutter {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: GARBUTTERTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface GARBUTTERTags {
  sideType: string;
  defaultSides: string;
  defaultToppings: string;
}

export interface P12Ipabp {
  code: string;
  flavorCode: P12IPABPFlavorCode;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: P12IPABPTags;
  allowedCookingInstructions: AllowedCookingInstructions;
  defaultCookingInstructions: DefaultCookingInstructions;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export enum P12IPABPFlavorCode {
  Bk = "BK",
  Npan = "NPAN",
}

export interface P12IPABPTags {
  hideOption?: HideOptionEnum;
  specialty?: boolean;
  promotion?: Promotion;
  disabledToppings: DisabledToppings;
  defaultSides: string;
  defaultToppings: string;
  sodiumWarningEnabled?: boolean;
}

export enum DisabledToppings {
  C = "C",
}

export enum Promotion {
  Pan = "PAN",
}

export interface P12Ipaza {
  code: string;
  flavorCode: P12IPABPFlavorCode;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: IndecentTags;
  allowedCookingInstructions: AllowedCookingInstructions;
  defaultCookingInstructions: DefaultCookingInstructions;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface IndecentTags {
  hideOption: HideOptionEnum;
  warnAfterOptionQty: string;
  promotion: Promotion;
  disabledToppings: DisabledToppings;
  sodiumWarningEnabled: boolean;
  defaultSides: string;
  defaultToppings: string;
}

export interface PINBBLBDClass {
  code: string;
  flavorCode: The20BCOKEFlavorCode;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: PINBBLBDTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface PINBBLBDTags {
  sauceRequired: boolean;
  defaultSides: string;
  defaultToppings: string;
}

export interface PINBBLCCClass {
  code: string;
  flavorCode: The20BCOKEFlavorCode;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: PINBBLCCTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface PINBBLCCTags {
  maxOptionQty: string;
  defaultSides: string;
  defaultToppings: string;
}

export interface Stjude {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: STJUDETags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface STJUDETags {
  excludeFromMinimumAmounts: boolean;
  donation: string;
  excludeFromLoyalty: boolean;
  defaultSides: string;
  defaultToppings: string;
}

export interface Stjuderu {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: string;
  tags: STJUDERUTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface STJUDERUTags {
  excludeFromMinimumAmounts: boolean;
  notEditable: boolean;
  hidden: boolean;
  donation: string;
  excludeFromLoyalty: boolean;
  defaultSides: string;
  defaultToppings: string;
}

export interface W06Pbbqw {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: SizeCode;
  tags: W06PBBQWTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export enum SizeCode {
  The16Pcw = "16PCW",
  The32Pcw = "32PCW",
  The6Pcw = "6PCW",
  The8Pcw = "8PCW",
}

export interface W06PBBQWTags {
  bundleBuilderProducts: boolean;
  wings: boolean;
  effectiveOn: Date;
  defaultSides: SBBQWDefaultSides;
  defaultToppings: string;
}

export interface Pbnlw {
  code: string;
  flavorCode: string;
  imageCode: string;
  local: boolean;
  name: string;
  price: string;
  productCode: string;
  sizeCode: SizeCode;
  tags: W08PBNLWTags;
  allowedCookingInstructions: string;
  defaultCookingInstructions: string;
  prepared: boolean;
  pricing: Pricing;
  surcharge: string;
}

export interface W08PBNLWTags {
  boneless: boolean;
  effectiveOn: Date;
  defaultSides: SBBQWDefaultSides;
  defaultToppings: string;
}
