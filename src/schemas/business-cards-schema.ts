import { SchemaModel } from "../models/schemas-model";
import TextInputComponent from "../components/form-inputs/text-input";
import CheckBoxInputComponent from "../components/form-inputs/checkbox-input";
import SelectInputComponent from "../components/form-inputs/select-input";
import { inputColumn } from "../models/types";
import MultiInputsComponent from "../components/form-inputs/multi-inputs";
import { BusinessCardModel } from "../models/db-models";
export const businessCardsSchema = (data: BusinessCardModel): SchemaModel => {
  const formValue = new BusinessCardModel(data);
  const validations = {
    name: (value: string) => (value?.length === 0 ? "Required" : null),
    thickness: (value: string) => (value?.length === 0 ? "Required" : null),
    coating: (value: string) => (value?.length === 0 ? "Required" : null),
    sides: (value: string) => (value?.length === 0 ? "Required" : null),
    round: (value: string) => (value?.length === 0 ? "Required" : null),
  };

  const inputs: Array<inputColumn[]> = [
    [
      {
        title: "Card Name",
        key: "name",
        component: TextInputComponent,
      },
    ],
    [
      {
        title: "Paper thickness",
        key: "thickness",
        component: TextInputComponent,
      },
    ],
    [
      {
        title: "Coating",
        key: "coating",
        data: ["No Coating", "Matte Finish"],
        component: SelectInputComponent,
      },
      {
        title: "Sides",
        key: "sides",
        data: ["1 sided", "2 sided"],
        component: SelectInputComponent,
      },
    ],
    [
      {
        title: "Round Corners",
        key: "round",
        component: CheckBoxInputComponent,
        customClassName: "mt-4 mb-4",
      },
    ],
    [
      {
        title: "Cost/Quantity",
        key: "costQuantity",
        component: MultiInputsComponent,
        inputColumns: [
          {
            title: "Cost",
            key: "cost",
          },
          {
            title: "Quantity",
            key: "quantity",
          },
        ],
      },
    ],
  ];

  return {
    title: "Business Cards Add/Edit",
    inputs,
    validations,
    formValue,
    saveFnName: "businessCardFn",
    multiInputs: true,
    createSimilar: true,
  };
};
