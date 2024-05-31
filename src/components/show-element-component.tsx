import React from "react";
import { ActionsEnum } from "../models/actions-enum";
import { Button } from "@mantine/core";
import styled from "styled-components";
export default function ShowElement(props: {
  routeName;
  data;
  setToggleDialog;
}) {
  return (
    <ElementContainer>
      <div>
        {Object.keys(props.data).map((key) => (
          <div className="data-item" key={key}>
            <span className="data-key">{key}:</span>
            <span>{props.data[key]}</span>
          </div>
        ))}

        <StyledButton
          onClick={() => {
            const routeName = props.routeName;
            props.setToggleDialog({
              state: true,
              routeName,
              action: ActionsEnum.update,
              data: props.data,
            });
          }}
        >
          Edit
        </StyledButton>

        {props.routeName === "clients" && (
          <StyledButton
            onClick={() => {
              const additionalData = {};
              additionalData[`client_id`] = props.data.id;
              props.setToggleDialog({
                state: true,
                routeName: "invoices",
                action: ActionsEnum.add,
                data: additionalData,
              });
            }}
          >
            Create Invoice
          </StyledButton>
        )}
      </div>
    </ElementContainer>
  );
}
const ElementContainer = styled.div`
  margin: auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .data-item {
    margin: 10px 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .data-key {
    font-weight: bold;
  }
`;
const StyledButton = styled(Button)`
  margin-right: 10px;
`;
