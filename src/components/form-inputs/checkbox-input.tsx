import { inputColumn } from "../../models/types";
import { UseFormReturnType } from "@mantine/form";
import { Checkbox } from "@mantine/core";
import React from "react";

export default function CheckBoxInputComponent(params: {
  props: inputColumn;
  form: UseFormReturnType<any>;
}) {
  return (
    <>
      <Checkbox
        label={params.props.title}
        color="violet"
        {...params.form.getInputProps(params.props.key, {
          type: "checkbox",
        })}
      />
    </>
  );
}
