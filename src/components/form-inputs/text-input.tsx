import { TextInput } from "@mantine/core";
import React from "react";
import { inputColumn } from "../../models/types";
import { UseFormReturnType } from "@mantine/form";

export default function TextInputComponent(params: {
  props: inputColumn;
  form: UseFormReturnType<any>;
}) {
  return (
    <TextInput
      className={params.props.customClassName}
      style={{ width: "-webkit-fill-available" }}
      label={params.props.title}
      placeholder={params.props.title}
      {...params.form.getInputProps(params.props.key)}
    />
  );
}
