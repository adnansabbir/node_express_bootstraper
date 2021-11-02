import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import * as dotenv from "dotenv";
import cookieSession from 'cookie-session';


import {MainRouter} from "./routes/main.route";
import {connectToDb} from "./utilities/database.utility";
import {errorHandler} from "./middlewares/errpr-handler.middleware";
import {checkEnvData} from "./utilities/check-env-data.utility";
import {currentUserCollector} from "./middlewares/current-user-collector.middleware";

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

const port = process.env.PORT || 5000;

app.use(currentUserCollector);
// Router
app.use(MainRouter);

// Error handler
app.use(errorHandler);

const start = async () => {
    checkEnvData();
    await connectToDb();
    console.log(`Connected to db`);
    app.listen(port);
}

start().then(() => {
    console.log(`Server running on port ${port}`);
}).catch(e => {
    console.log(`Error starting server`, e);
})
