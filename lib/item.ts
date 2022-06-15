export interface Item {
  iD?:                 number;
  code:               string;
  qty?:                number;
  options?:            Options;
  isNew?:              boolean;
  categoryCode?:       string;
  flavorCode?:         string;
  status?:             number;
  likeProductID?:      number;
  name?:               string;
  needsCustomization?: boolean;
  autoRemove?:         boolean;
  fulfilled?:          boolean;
  sideOptions?:        any[];
  tags?:               any;
  descriptions?:       Description[];
}

export interface Options {
  [key: string]: {
    [key: string]: number
  };
}

export interface Description {
  portionCode: string;
  value:       string;
}

