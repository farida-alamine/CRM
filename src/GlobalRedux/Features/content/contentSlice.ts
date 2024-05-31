import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ClientModel,
  InvoiceModel,
  PaymentModel,
  UserModel,
} from "../../../models/db-models";

type contentState = {
  content: {
    users: UserModel[];
    clients: ClientModel[];
    invoices: InvoiceModel[];
    payment: PaymentModel[];
    businessCards: any;
    flyers?: any;
  };
  status: string;
  error: string;
};

const initialState: contentState = {
  content: {
    users: [],
    clients: [],
    invoices: [],
    payment: [],
    businessCards: [],
    flyers: [],
  },
  status: "idle",
  error: null,
};

function mapProducts(products) {
  const mappedProducts = {
    businessCards: [],
    flyers: [],
  };

  products.forEach((product) => {
    if (mappedProducts[product.type]) {
      const details = {
        id: product.id,
        name: product.name,
        pricing: product.pricing,
      };

      product.specs.forEach((item) => {
        details[item.key] = item.value;
      });

      mappedProducts[product.type].push(details);
    }
  });

  return mappedProducts;
}

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const URL = process.env.NEXT_PUBLIC_SERVER_API;
    const usersRes = await axios.get(`${URL}/users`);
    const clientsRes = await axios.get(`${URL}/clients`);
    const invoicesRes = await axios.get(`${URL}/invoices`);
    const paymentRes = await axios.get(`${URL}/payment`);
    const productsRes = await axios.get(`${URL}/products`);

    const products = mapProducts(productsRes.data);

    const content = {
      users: usersRes.data,
      clients: clientsRes.data,
      invoices: invoicesRes.data,
      payment: paymentRes.data,
      businessCards: products.businessCards,
      flyers: products.flyers,
    };
    return content;
  },
);

export const addItem = createAsyncThunk(
  "item/addItem",
  async (data: { item: any; routeName: string }) => {
    const URL = process.env.NEXT_PUBLIC_SERVER_API;
    const item = data.item;
    const itemType =
      data.routeName === "businessCards" ? "products" : data.routeName;
    const response = await axios.post(`${URL}/${itemType}`, item);
    return response.data;
  },
);

export const editItem = createAsyncThunk(
  "item/editItem",
  async (data: { item: any; routeName: string }) => {
    const URL = process.env.NEXT_PUBLIC_SERVER_API;
    const item = data.item;
    const itemType =
      data.routeName === "businessCards" ? "products" : data.routeName;
    const response = await axios.patch(`${URL}/${itemType}/${item.id}`, item);
    return response.data;
  },
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (data: { id: string; routeName: string }) => {
    const URL = process.env.NEXT_PUBLIC_SERVER_API;
    const itemType =
      data.routeName === "businessCards" ? "products" : data.routeName;
    const response = await axios.delete(`${URL}/${itemType}/${data.id}`);
    return response.data;
  },
);
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.content = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contentSlice.reducer;
