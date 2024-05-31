import { SchemaModel } from "../models/schemas-model";
import { ClientModel } from "../models/db-models";
import TextInputComponent from "../components/form-inputs/text-input";
export const clientsSchema = (data: ClientModel): SchemaModel => {
  const formValue = new ClientModel(data);
  const saveFnName = "clientFn";
  const validations = {
    email: (value: string) =>
      /^\S+@\S+$/.test(value) ? null : "Invalid email",
    phone: (value: string) =>
      value.length < 8 ? "invalid phone number" : null,
    firstName: (value: string) => (value.length === 0 ? "Required" : null),
    lastName: (value: string) => (value.length === 0 ? "Required" : null),
    location: (value: string) => (value.length === 0 ? "Required" : null),
  };

  const inputs = [
    [
      {
        title: "First Name",
        key: "firstName",
        component: TextInputComponent,
      },
      {
        title: "Last Name",
        key: "lastName",
        component: TextInputComponent,
      },
    ],
    [
      { title: "email", key: "email", component: TextInputComponent },
      {
        title: "phone number",
        key: "phone",
        component: TextInputComponent,
      },
    ],
    [
      {
        title: "location",
        key: "location",
        customClassName: "input-half-row",
        component: TextInputComponent,
      },
    ],
  ];
  return {
    title: "Clients Cards Add/Edit",
    inputs,
    validations,
    formValue,
    saveFnName,
  };
};
