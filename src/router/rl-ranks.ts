import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

export const rlRanksRouter = Router();

rlRanksRouter.get("/", async (req, res) => {
    const rlRanks = await prisma.rLRank.findMany(
      {
        orderBy: {
          order: "asc"
        }
      }
    );

    res.json(rlRanks);
});