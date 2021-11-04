import express from "express";
import {validateRequest} from "../../middlewares/validate-request";
import {createEmailTemplateController} from "../../controllers/utility.controller";
import {createEmailTemplateValidator} from "../../validators/utility.validators";
import {authenticateRoute} from "../../middlewares/authenticate-route.middleware";

const router = express.Router();

// parent -> /utility

router.post('/create-email-template', authenticateRoute, createEmailTemplateValidator, validateRequest, createEmailTemplateController);

export const UtilityRouter = router;
