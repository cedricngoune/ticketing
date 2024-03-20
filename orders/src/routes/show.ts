import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@gotickets/common";
import { Order } from "../models/orders";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    // populate() allows to get an ticket associated to an order
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
