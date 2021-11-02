import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import * as dotenv from "dotenv";
import cookieSession from 'cookie-session';


import {MainRouter} from "./routes/main.route";
import {errorHandler} from "./middlewares/errpr-handler.middleware";
import {currentUserCollector} from "./middlewares/current-user-collector.middleware";
import {checkEnvData} from "./utilities/check-env-data.utility";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
// Other middlewares
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(cookieSession({
    signed: false,
    secure: false
}));

app.use(currentUserCollector);
// Router
app.use(MainRouter);

// Error handler
app.use(errorHandler);

checkEnvData();
export {app};
