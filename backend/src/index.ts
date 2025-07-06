import express, { Request, Response } from "express";
import cors from "cors";

import { ICreatePayment, YooCheckout } from "@a2seven/yoo-checkout";


const database ={

    
}


const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

//...............

const YouKassa = new YooCheckout({
  shopId: "1120024",
  secretKey: "test_kUtBoheJcWDx9cq2AvE588rLUQVkeROgV28-49IEjrM",
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
    confirmation: {
      type: "redirect",
      return_url: "https://github.com/Michael-developerr",
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
