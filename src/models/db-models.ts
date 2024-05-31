import dayjs from "dayjs";

export class UserModel {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  role: string;
  constructor(props?: UserModel) {
    return {
      id: props?.id || "",
      username: props?.username || "",
      password: props?.password || "",
      firstName: props?.firstName || "",
      lastName: props?.lastName || "",
      phone: props?.phone || 0,
      email: props?.email || "",
      role: props?.role || "",
    };
  }
}
export class ClientModel {
  id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  location: string;

  constructor(props?: ClientModel) {
    return {
      id: props?.id || "",
      firstName: props?.firstName || "",
      lastName: props?.lastName || "",
      phone: props?.phone || 0,
      email: props?.email || "",
      location: props?.location || "",
    };
  }
}

export class InvoiceModel {
  id: string;
  title: string;
  notes: string;
  createDate: string;
  media: File;
  lastModifiedDate: string;
  client_id: string;
  constructor(props?: InvoiceModel) {
    return {
      id: props?.id || "",
      title: props?.title || "",
      notes: props?.notes || "",
      media: props?.media || null,
      createDate: props?.createDate || dayjs().format("YYYY MM DD"),
      lastModifiedDate: dayjs().format("YYYY MM DD"),
      client_id: props?.client_id || "",
    };
  }
}

export class PaymentModel {
  id: string;
  amount: number;
  createDate: string;
  constructor(props?: PaymentModel) {
    return {
      id: props?.id || "",
      amount: props?.amount || 0,
      createDate: props?.createDate || dayjs().format("YYYY MM DD"),
    };
  }
}
export class BusinessCardModel {
  id: string;
  name: string;
  round: boolean;
  type: "businessCards";
  pricing: { cost: number; quantity: number }[];
  thickness: string;
  coating: string;
  sides: string;
  constructor(props?: BusinessCardModel) {
    return {
      id: props?.id || "",
      name: props?.name || "",
      round: props?.round || false,
      type: "businessCards",
      pricing: props?.pricing || [],
      thickness: props?.thickness || "",
      coating: props?.coating || "",
      sides: props?.sides || "",
    };
  }
}
