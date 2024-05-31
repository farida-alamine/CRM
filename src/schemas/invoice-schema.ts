import { SchemaModel } from "../models/schemas-model";
import { InvoiceModel } from "../models/db-models";
import TextInputComponent from "../components/form-inputs/text-input";
import FileInputComponent from "../components/form-inputs/file-input";
import { SelectComponent } from "../components/select-component";

export const invoicesSchema = (data: InvoiceModel): SchemaModel => {
  const formValue = new InvoiceModel(data);
  const saveFnName = "invoiceFn";
  const validations = {
    title: (value: string) => (value.length === 0 ? "Required" : null),
    notes: (value: string) => (value.length === 0 ? "Required" : null),
    client_id: (value: string) => (value.length === 0 ? "Required" : null),
    // media: (value: string) => (value.length === 0 ? "Required" : null),
  };

  const inputs = [
    [
      {
        title: "title",
        key: "title",
        component: TextInputComponent,
      },
    ],
    [{ title: "notes", key: "notes", component: TextInputComponent }],
    [
      {
        title: "Client ID",
        key: "client_id",
        entity: "clients",
        component: SelectComponent,
      },
    ],
    [{ title: "media", key: "media", component: FileInputComponent }],
  ];

  return {
    title: "Invoices Add/Edit",
    inputs,
    validations,
    formValue,
    saveFnName,
  };
};
