import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

export const promosRouter = Router();

promosRouter.get("/", async (req, res) => {
    const promos = await prisma.promo.findMany(
      {
        orderBy: {
          order: "asc"
        }
      }
    );

    res.json(promos);
});