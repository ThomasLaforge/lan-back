import cors from "cors";
import "dotenv/config";
import express from "express";

import { authRouter } from "./router/auth";
import { inscriptionsRouter } from "./router/inscriptions";

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/inscriptions', inscriptionsRouter );

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
