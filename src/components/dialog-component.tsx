import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ShowElement from "./show-element-component";
import DynamicFormComponent from "./dynamic-form-component";
import { ActionsEnum } from "../models/actions-enum";
import { ProductsEnum, ToggleDialogState } from "../models/types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DialogComponent(props: {
  setToggleDialog: (state: ToggleDialogState) => void;
  handleCloseDialog: () => void;
  dialogInfo: {
    routeName: string | null;
    action: string | null;
    data;
    productType?: ProductsEnum;
  };
}) {
  const [open, setOpen] = React.useState(true);
  const routeName = props.dialogInfo.routeName;
  const data = props.dialogInfo.data;
  const action = props.dialogInfo.action;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={() => {
          setOpen(false);
          props.handleCloseDialog();
        }}
      >
        {action === ActionsEnum.show ? (
          <ShowElement
            routeName={routeName}
            data={data}
            setToggleDialog={props.setToggleDialog}
          />
        ) : action === ActionsEnum.add ? (
          <DynamicFormComponent
            routeName={routeName}
            productType={props.dialogInfo.productType}
            customData={data ? data : null}
            setToggleDialog={props.setToggleDialog}
            handleCloseDialog={props.handleCloseDialog}
          />
        ) : action === ActionsEnum.update ? (
          <DynamicFormComponent
            routeName={routeName}
            productType={props.dialogInfo.productType}
            editData={data}
            setToggleDialog={props.setToggleDialog}
            handleCloseDialog={props.handleCloseDialog}
          />
        ) : null}
      </Dialog>
    </div>
  );
}
