import { Group, Text, Select } from "@mantine/core";
import { forwardRef } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { inputColumn } from "../models/types";
interface SelectItemProps {
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItemComponent({ label, description, ...others }, ref) {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    );
  },
);
SelectItem.displayName = "SelectItem";
export function SelectComponent(params: { form; props: inputColumn }) {
  const contentState = useSelector((state: RootState) => state.content);
  const data = contentState.content[params.props.entity];

  function renderData(data) {
    if (data)
      return data.map((item) => {
        //only valid for clients entity
        return {
          value: item.id,
          label: `${item.firstName} ${item.lastName}`,
          description: `${item.phone}, ${item.email}`,
        };
      });
    else return [];
  }

  return (
    <div>
      <Select
        style={{ width: "185px" }}
        label="Choose a client"
        placeholder="Pick one"
        itemComponent={SelectItem}
        data={renderData(data)}
        searchable
        maxDropdownHeight={400}
        nothingFound="No clients found"
        filter={(value, item) =>
          item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim())
        }
        {...params.form.getInputProps(params.props.key)}
      />
    </div>
  );
}
