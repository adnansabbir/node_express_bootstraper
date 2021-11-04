import express from "express";
import {IAMRouter} from "./iam/iam.routes";
import {NotFoundError} from "../utilities/classes/errors/not-found.error";
import {UtilityRouter} from "./utility-routes/utility.routes";

const router = express.Router();

router.use('/iam', IAMRouter);
router.use('/utility', UtilityRouter);
router.use('*', async () => {
    throw new NotFoundError();
})

export const MainRouter = router;
