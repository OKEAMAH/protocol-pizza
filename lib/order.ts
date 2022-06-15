import { Address } from "./customer"

export interface Order {
  validate(): any
  address: Address
  amounts: any
  amountsBreakdown: any
  businessDate: string
  coupons: any[]
  currency: string
  customerID: string
  estimatedWaitMinutes: string
  email: string
  extension: string
  firstName: string
  hotspotsLite: boolean
  iP: string
  lastName: string
  languageCode: string
  market: string
  metaData: any[]
  newUser: boolean
  noCombine: boolean
  orderChannel: string
  orderID: string
  orderInfoCollection: any[]
  orderMethod: string
  orderTaker: string
  partners: any
  payments: any[]
  phone: string
  priceOrderMs: number
  priceOrderTime: string
  products: any[]
  promotions: any
  pulseOrderGuid: string
  serviceMethod: string
  sourceOrganizationURI: string
  storeID: number
  tags: any
  userAgent: string
  version: string
  status: number
}