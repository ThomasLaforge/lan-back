import cors from "cors";
import "dotenv/config";
import express from "express";

import { authRouter } from "./router/auth";
import { promosRouter } from "./router/promos";
import { rankingsRouter } from "./router/rankings";
import { resultsRouter } from "./router/results";
import { rlRanksRouter } from "./router/rl-ranks";
import { teamsRouter } from "./router/teams";

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/results', resultsRouter);
apiRouter.use('/rankings', rankingsRouter);
apiRouter.use('/rl-ranks', rlRanksRouter);
apiRouter.use('/promos', promosRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
