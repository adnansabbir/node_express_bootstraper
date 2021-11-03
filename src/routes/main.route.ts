import express from "express";
import {IAMRouter} from "./iam/iam.routes";
import {NotFoundError} from "../utilities/classes/errors/not-found.error";

const router = express.Router();

router.use('/iam', IAMRouter);
router.use('*', async () => {
    throw new NotFoundError();
})

export const MainRouter = router;
