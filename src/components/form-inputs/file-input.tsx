import React from "react";
import { FileInput } from "@mantine/core";
import { inputColumn } from "../../models/types";
import { UseFormReturnType } from "@mantine/form";
export default function FileInputComponent(params: {
  props: inputColumn;
  form: UseFormReturnType<any>;
}) {
  return (
    <FileInput
      style={{ width: "185px" }}
      label={params.props.title}
      placeholder="Upload files"
      {...params.form.getInputProps(params.props.key)}
    />
  );
}
