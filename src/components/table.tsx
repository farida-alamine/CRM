"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { tablesConfig } from "../config/table-config";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { ActionsEnum } from "../models/actions-enum";
import { EditIcon } from "../icons/EditIcon";
import { AddIcon } from "../icons/AddIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import {
  deleteItem,
  fetchContent,
} from "../GlobalRedux/Features/content/contentSlice";
import { nanoid } from "@reduxjs/toolkit";
export default function TableComponent(props: {
  data;
  routeName;
  setToggleDialog;
}) {
  const routeName = props.routeName;
  const columns: { key: string; title: string }[] = tablesConfig[routeName];
  const usersData = props.data;
  const dispatch = useDispatch<any>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this item?`,
    );

    if (confirmed) {
      await dispatch(deleteItem({ id, routeName }));
      await dispatch(fetchContent());
    }
  };

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(usersData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return usersData.slice(start, end);
  }, [page, usersData]);
  const renderCell = React.useCallback(
    (user: any, columnKey: any) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {/* <Tooltip title="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    props.setToggleDialog({
                      state: true,
                      routeName,
                      action: ActionsEnum.show,
                      data: user,
                    });
                  }}
                >
                  <EyeIcon />
                </span>
              </Tooltip> */}
              <Tooltip title="Edit">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    props.setToggleDialog({
                      state: true,
                      routeName,
                      action: ActionsEnum.update,
                      data: user,
                    });
                  }}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip title="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
              {routeName === "businessCards" && (
                <Tooltip title="Create similar">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => {
                      props.setToggleDialog({
                        state: true,
                        routeName,
                        action: ActionsEnum.add,
                        data: user,
                      });
                    }}
                  >
                    <AddIcon />
                  </span>
                </Tooltip>
              )}
            </div>
          );
        case "round":
          return cellValue === true ? "true" : "false";
        default:
          return cellValue;
      }
    },
    [props, handleDelete, routeName],
  );
  return (
    <Table
      isStriped
      aria-label="Example table with dynamic content"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page: any) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
      className="bg-gray-50"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.title}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={nanoid()} style={{ color: "white" }}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
