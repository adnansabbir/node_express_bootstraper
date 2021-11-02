import express from "express";
import {
    currentUserController,
    tokenController,
    registerController,
    signOutController
} from "../../controllers/iam/auth.controller";
import {tokenValidator, registerValidator} from "../../validators/iam/auth.validators";
import {validateRequest} from "../../middlewares/validate-request";
import {authenticateRoute} from "../../middlewares/authenticate-route.middleware";

const router = express.Router();

// parent -> /iam/auth

router.post('/register', registerValidator, validateRequest, registerController);
router.post('/token', tokenValidator, validateRequest, tokenController);
router.get('/currentUser', authenticateRoute, currentUserController);
router.post('/signout', signOutController);

export const AuthRouter = router;
