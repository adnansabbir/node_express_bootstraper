import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import * as dotenv from "dotenv";
import cookieSession from 'cookie-session';


import {MainRouter} from "./routes/main.route";
import {errorHandler} from "./middlewares/error-handler.middleware";
import {currentUserCollector} from "./middlewares/current-user-collector.middleware";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
export const app = express();

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
