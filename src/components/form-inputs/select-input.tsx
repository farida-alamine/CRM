import React from "react";
import { Select } from "@mantine/core";
import { inputColumn } from "../../models/types";
import { UseFormReturnType } from "@mantine/form";
export default function SelectInputComponent(params: {
  props: inputColumn;
  form: UseFormReturnType<any>;
}) {
  return (
    <Select
      label={`choose ${params.props.title}`}
      style={{ width: "-webkit-fill-available" }}
      placeholder="pick"
      data={params.props.data}
      {...params.form.getInputProps(params.props.key)}
    />
  );
}
