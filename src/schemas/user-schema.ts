import { SchemaModel } from "../models/schemas-model";
import { UserModel } from "../models/db-models";
import TextInputComponent from "../components/form-inputs/text-input";
import SelectInputComponent from "../components/form-inputs/select-input";
export const usersSchema = (data: UserModel): SchemaModel => {
  const formValue = new UserModel(data);
  const saveFnName = "UserFn";
  const validations = {
    firstName: (value: string) => (value.length === 0 ? "Required" : null),
    lastName: (value: string) => (value.length === 0 ? "Required" : null),
    username: (value: string) => (value.length === 0 ? "Required" : null),
    password: (value: string) => (value.length === 0 ? "Required" : null),
    phone: (value: string) =>
      value.length < 8 ? "Invalid phone number" : null,
    email: (value: string) =>
      /^\S+@\S+$/.test(value) ? null : "Invalid email",
    role: (value: string) => (value.length === 0 ? "Required" : null),
  };

  const inputs = [
    [{ title: "Username", key: "username", component: TextInputComponent }],
    [{ title: "Password", key: "password", component: TextInputComponent }],
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
      { title: "Email", key: "email", component: TextInputComponent },
      {
        title: "Phone Number",
        key: "phone",
        component: TextInputComponent,
      },
    ],
    [
      {
        title: "Role",
        key: "role",
        data: ["Admin", "User"],
        component: SelectInputComponent,
      },
    ],
  ];

  return {
    title: "Users Add/Edit",
    inputs,
    validations,
    formValue,
    saveFnName,
  };
};
