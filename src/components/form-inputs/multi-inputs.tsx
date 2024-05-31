"use client";
import React from "react";
import { inputColumn } from "../../models/types";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import styled from "styled-components";
import { Divider } from "@mantine/core";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { AddIcon } from "../../icons/AddIcon";
import { Button } from "@nextui-org/react";
export default function MultiInputsComponent(params: {
  props: inputColumn;
  form: any;
  multiInputs;
  onMultiInputsChange;
}) {
  const [inputs, setInputs] = useState([params.props.inputColumns]);
  const [values, setValues] = useState<{ cost; quantity }[]>([
    {
      cost: "",
      quantity: "",
    },
  ]);
  const addInputRow = () => {
    setInputs((prev) => {
      return [...prev, params.props.inputColumns];
    });
    setValues((prev) => {
      return [...prev, { cost: "", quantity: "" }];
    });
  };

  const handleOnChange = (index, key, value) => {
    if (Number(value) || (value === "" && value !== "0")) {
      setValues((prev) => {
        prev[index][key] = value;
        return [...prev];
      });
      params.onMultiInputsChange((prev) => {
        if (!prev[index]) prev[index] = { cost: "", quantity: "" };
        prev[index][key] = value;
        return [...prev];
      });
    }
  };

  const handleDelete = (index) => {
    if (inputs.length > 1) {
      setInputs((prev) => {
        const newInputs = prev.filter(
          (inputRow, rowIndex) => rowIndex !== index,
        );
        return newInputs;
      });
      setValues((prev) => {
        const newValues = prev.filter(
          (inputRow, rowIndex) => rowIndex !== index,
        );
        return newValues;
      });
    }
  };
  return (
    <MultiInputContainer>
      <Divider color="grey" style={{ width: "100%", paddingBottom: 10 }} />
      <div
        className="title"
        onClick={() => {
          addInputRow();
        }}
      >
        <span>{params.props.title}</span>

        <Button
          isIconOnly
          variant="solid"
          size="sm"
          onClick={() => {
            addInputRow();
          }}
        >
          <AddIcon />
        </Button>
      </div>

      <div className="inputs-container" style={{ padding: "0.5em 0em" }}>
        {inputs.map((inputRow, index) => {
          return (
            <div key={index}>
              <div key={index} className="input-row">
                {inputRow.map((column, columnIndex) => {
                  return (
                    <TextInput
                      key={`${index}-${columnIndex}`}
                      label={column.title}
                      value={values[index][`${column.key}`]}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        handleOnChange(index, column.key, e.target.value);
                      }}
                    />
                  );
                })}
                <div
                  onClick={() => {
                    handleDelete(index);
                  }}
                  className="delete text-danger"
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </MultiInputContainer>
  );
}

const MultiInputContainer = styled.div`
  width: 100%;
  .title {
    font-size: 1.1rem;
    width: fit-content;
    color: white;
    display: flex;
    gap: 0.5em;
    align-items: center;
    text-transform: capitalize;
    cursor: pointer;

    button {
      width: 22px !important;
      height: 22px !important;
    }
  }
  .delete {
    margin-top: 33px;
    cursor: pointer;
  }
`;
