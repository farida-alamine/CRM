import { inputColumn } from "./types";
import {
  InvoiceModel,
  PaymentModel,
  ClientModel,
  UserModel,
  BusinessCardModel,
} from "./db-models";

export interface SchemaModel {
  inputs: Array<Array<inputColumn>>;
  validations: any;
  formValue:
    | UserModel
    | InvoiceModel
    | PaymentModel
    | ClientModel
    | BusinessCardModel
    | null;
  saveFnName: string;
  title?: string;
  multiInputs?: boolean;
  createSimilar?: boolean;
  features?: {
    fetch: string;
    add: string;
    edit: string;
    delete: string;
  };
}
