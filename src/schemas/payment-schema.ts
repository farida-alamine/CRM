import { SchemaModel } from "../models/schemas-model";
import { PaymentModel } from "../models/db-models";
import TextInputComponent from "../components/form-inputs/text-input";
export const paymentSchema = (data: PaymentModel): SchemaModel => {
  const formValue = new PaymentModel(data);
  const saveFnName = "paymentFn";
  const validations = {
    amount: (value: string) => (value.length === 0 ? "Required" : null),
  };

  const inputs = [
    [{ title: "amount", key: "amount", component: TextInputComponent }],
  ];

  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
      validations[inputs[i][j].key] = (value: string) =>
        value.length === 0 ? "Required" : null;
    }
  }
  return {
    title: "Payment Add/Edit",
    inputs,
    validations,
    formValue,
    saveFnName,
  };
};
