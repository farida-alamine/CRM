import {
  InvoiceModel,
  PaymentModel,
  UserModel,
  ClientModel,
  BusinessCardModel,
} from "./db-models";

export type ToggleDialogState = {
  state: boolean;
  routeName: string | null;
  action: string | null;
  data:
    | UserModel
    | InvoiceModel
    | PaymentModel
    | ClientModel
    | BusinessCardModel
    | null;
};

export type inputColumn = {
  title: string;
  key: string;
  customClassName?: string | null;
  data?: Array<string> | null;
  entity?: string;
  component?: any;
  inputColumns?: { title: string; key: string }[];
};

export class PricingModel {
  quantity: number;
  cost: number;
}

export interface ProductSpecsModel {
  key: string;
  value: string;
}

export enum ProductsEnum {
  businessCards = "businessCards",
  flyers = "flyers",
}
