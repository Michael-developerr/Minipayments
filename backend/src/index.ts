import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";

import { ICreatePayment, YooCheckout } from "@a2seven/yoo-checkout";
const database: any = {};

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

//...............

const YouKassa = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID!,
  secretKey: process.env.YOOKASSA_SECRET!,
});

app.post("/api/payment", async (req: Request, res: Response) => {
  const createPayload: ICreatePayment = {
    amount: {
      value: req.body.value,
      currency: "RUB",
    },
    payment_method_data: {
      type: "bank_card", // тип банковскуая карта
    },
    capture: true,
    confirmation: {
      type: "redirect",
      return_url: "https://essentially-outgoing-collie.cloudpub.ru",
    },
    metadata: {
      orderId: req.body.orderId,
      userId: req.body.userId,
    },
  };

  try {
    const payment = await YouKassa.createPayment(
      createPayload,

      Date.now().toString()
    ); // тут мы можем указать вместо  Date.now().toString() //  V4 UUID.

    res.json({ payment });

    console.log(payment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error" });
  }
});

app.post("/api/payment/notifications", async (req: Request, res: Response) => {
  console.log(req.body);
  database[req.body.id] = req.body;
  res.json({ status: "ok" });
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
