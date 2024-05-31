"use client";
import { Divider } from "@mantine/core";
import * as schemas from "../schemas/schemas-index";
import { useForm } from "@mantine/form";
import { SchemaModel } from "../models/schemas-model";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ProductsEnum, ToggleDialogState, inputColumn } from "../models/types";
import { Checkbox } from "@mantine/core";
import { ActionsEnum } from "../models/actions-enum";
import { Button } from "@nextui-org/react";
import {
  addItem,
  deleteItem,
  editItem,
  fetchContent,
} from "../GlobalRedux/Features/content/contentSlice";
import { CloseIcon } from "../icons/CloseIcon";

function mapObject(inputObject, itemType) {
  if (itemType === "businessCards" || itemType === "flyers") {
    const { name, id, type, pricing, ...specs } = inputObject;
    const specsArray = Object.entries(specs).map(([key, value]) => {
      return { key, value };
    });
    const resultObject = {
      name,
      id,
      pricing,
      type,
      specs: specsArray,
    };
    return resultObject;
  } else return inputObject;
}

const DynamicFormComponent = (props: {
  routeName: string;
  productType?: ProductsEnum;
  setToggleDialog?: (state: ToggleDialogState) => void;
  handleCloseDialog?: () => void;
  editData?;
  customData?: any;
}) => {
  const schema: SchemaModel = props.editData
    ? schemas[`${props.routeName}Schema`](props.editData, props.productType)
    : schemas[`${props.routeName}Schema`](props.customData, props.productType);
  const routeName = props.routeName;
  const form = useForm({
    initialValues: schema.formValue,
    validate: schema.validations,
    validateInputOnChange: true,
  });
  const [multiInputs, setMultiInputs] = useState(() => {
    if (schema.multiInputs) return [{ cost: "", quantity: "" }];
    else return [];
  });
  const validateMultiInputs = () => {
    if (multiInputs) {
      for (let i = 0; i < multiInputs.length; i++) {
        if (!multiInputs[i]?.cost || !multiInputs[i]?.quantity) {
          return false;
        }
      }
      return true;
    } else return true;
  };
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const dispatch = useDispatch<any>();
  const createSimilarRef = useRef();

  // const [toggleDialog, setToggleDialog] = useState<ToggleDialogState>({
  //   state: false,
  //   routeName,
  //   action: null,
  //   data: null,
  // });

  const handleSubmit = async (values) => {
    if (validateMultiInputs()) {
      setErrorMessage(undefined);
      if (multiInputs[0]) values["pricing"] = multiInputs;
      if (createSimilarRef.current) {
        if (createSimilarRef.current["checked"]) {
          props.setToggleDialog({
            state: true,
            routeName: props.routeName,
            action: ActionsEnum.add,
            data: values,
          });
        } else props.handleCloseDialog();
      } else props.handleCloseDialog();
      if (!props.editData) {
        // add form
        const mappedValues = mapObject(values, routeName);
        await dispatch(addItem({ item: mappedValues, routeName }));
      } else {
        //edit form
        const mappedValues = mapObject(values, routeName);
        await dispatch(editItem({ item: mappedValues, routeName }));
      }
      await dispatch(fetchContent());
    } else {
      setErrorMessage(() => "all fields required!");
    }
  };
  const handleDelete = async () => {
    props.handleCloseDialog();
    const id = props.editData.id;
    await dispatch(deleteItem({ id, routeName }));
    await dispatch(fetchContent());
  };

  return (
    <FormContainer>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>{schema.title}</h1>

          <button
            onClick={() => {
              props.setToggleDialog({
                state: false,
                routeName,
                action: ActionsEnum.add,
                data: null,
              });
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <Divider color="grey" />

        <div className="inputs-container">
          {schema.inputs.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row-container">
                <div className="input-row" key={`${rowIndex}`}>
                  {row.map((column: inputColumn, columnIndex) => (
                    <column.component
                      key={`column-${rowIndex}-${columnIndex}`}
                      props={column}
                      form={form}
                      multiInputs={multiInputs}
                      onMultiInputsChange={setMultiInputs}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="errorMessage">{errorMessage}</div>
        <div className="buttons-container">
          <div>
            <Button
              type="submit"
              radius="sm"
              color="secondary"
              variant="solid"
              disabled={!form.isValid()}
            >
              Save
            </Button>

            <Button
              radius="sm"
              variant="light"
              style={{ marginLeft: 17 }}
              onClick={() => {
                props.setToggleDialog({
                  state: false,
                  routeName,
                  action: ActionsEnum.add,
                  data: null,
                });
              }}
            >
              Cancel
            </Button>
          </div>

          {props.editData && (
            <Button
              radius="sm"
              variant="ghost"
              color="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
          {schema.createSimilar && (
            <Checkbox
              label="create similar"
              color="primary"
              ref={createSimilarRef}
              defaultChecked={true}
            />
          )}
        </div>
      </form>
    </FormContainer>
  );
};
export default DynamicFormComponent;

// Styled Components
const FormContainer = styled.div`
  background-color: #18181b;
  padding: 20px;
  margin: auto;

  .errorMessage {
    font-size: 0.8rem;
    margin-left: 5px;
    color: red;
  }

  .buttons-container {
    justify-content: space-between;
    align-items: center;
    display: flex;
    gap: 5px;

    button {
      margin: 0;
    }
  }

  form {
    flex-direction: column;
    display: flex;

    h1 {
      font-size: 1.2em;
      color: white;
    }

    .inputs-container {
      flex-direction: column;
      padding: 1.8em 0em;
      display: flex;
      gap: 0.8em;
    }

    .input-row {
      display: flex;
      gap: 1em;
    }

    .input-half-row {
      width: calc(50%-1em);
    }

    label {
      color: #dcdcdc;
    }

    input::placeholder {
      color: black;
      opacity: 0.7;
    }

    input {
      background-color: grey;
      color: black;
      border: none;
    }
  }
`;
