import express from "express";
import {AuthRouter} from "./auth.routes";

const router = express.Router();

// parent -> /iam

router.use('/auth', AuthRouter);

export const IAMRouter = router;
