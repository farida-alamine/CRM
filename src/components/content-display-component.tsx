"use client";
import React from "react";
import TableComponent from "./table";
import { useState, useEffect } from "react";
import { ProductsEnum, ToggleDialogState } from "../models/types";
import dynamic from "next/dynamic";
import { Button } from "@mantine/core";
import { ActionsEnum } from "../models/actions-enum";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import styled from "styled-components";
import { fetchContent } from "../GlobalRedux/Features/content/contentSlice";
import { routes } from "../config/route-config";
import { getTokenCookie } from "../services/login-service";
import { verifyJWT } from "../lib/auth";

const DialogComponent = dynamic(() => import("./dialog-component"));

export default function ContentDisplayComponent(params: {
  routeName: string;
  title: string;
  productType?: ProductsEnum;
}) {
  const router = useRouter();
  const routeName = params.routeName;
  const [toggleDialog, setToggleDialog] = useState<ToggleDialogState>({
    state: false,
    routeName,
    action: null,
    data: null,
  });

  const handleCloseDialog = () => {
    setToggleDialog({
      state: false,
      routeName: null,
      action: null,
      data: null,
    });
  };

  const contentState = useSelector((state: RootState) => state.content);

  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (!routes.find((element) => element.path?.endsWith(routeName))) {
      router.push("/users");
      return;
    }

    const checkCookie = async () => {
      try {
        const token = await getTokenCookie();
        if (token) {
          const verifies = verifyJWT(token);
          console.log(verifies);
          if (!verifies) {
            router.replace("/logout");
          }
        }
      } catch (err) {
        router.replace("/logout");
      }
    };

    checkCookie();

    dispatch(fetchContent());
  }, [routeName, router, dispatch]);

  return (
    <div className="content-display">
      {toggleDialog.state && (
        <DialogComponent
          setToggleDialog={setToggleDialog}
          handleCloseDialog={handleCloseDialog}
          dialogInfo={{
            routeName: toggleDialog.routeName,
            action: toggleDialog.action,
            data: toggleDialog.data,
            productType: params.productType,
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            textTransform: "capitalize",
            color: "slategray",
            fontSize: "2em",
          }}
        >
          {params.title}
        </h1>

        <Button
          style={{ margin: " 10px" }}
          onClick={() => {
            setToggleDialog({
              state: true,
              routeName,
              action: ActionsEnum.add,
              data: null,
            });
          }}
        >
          Add New
        </Button>
      </div>

      {contentState.status === "succeeded" ? (
        <TableComponent
          data={contentState.content[routeName]}
          routeName={routeName}
          setToggleDialog={setToggleDialog}
        />
      ) : contentState.status === "failed" ? (
        <p>{contentState.error}</p>
      ) : (
        <LoadingContainer>
          <div className="loading-animation"></div>
        </LoadingContainer>
      )}
    </div>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: white;
  background-color: #2f2f2f;
  border-radius: 8px;

  body {
    margin: 0;
    background-color: #2f2f2f;
  }
  .loading-animation {
    width: 50px;
    height: 50px;
    border: 6px solid rgba(0, 0, 0, 0.1);
    border-left-color: #007bff;
    border-radius: 50%;
    background-color: #2f2f2f;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
