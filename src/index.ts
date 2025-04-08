import cors from "cors";
import "dotenv/config";
import express from "express";

import { authRouter } from "./router/auth";
import { teamsRouter } from "./router/teams";

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/teams', teamsRouter );

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
