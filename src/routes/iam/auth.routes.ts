import express from "express";
import {
    currentUserController,
    tokenController,
    registerController,
    signOutController, forgotPasswordController, resetPasswordController
} from "../../controllers/iam/auth.controller";
import {
    tokenValidator,
    registerValidator,
    forgotPasswordValidator,
    resetPasswordValidator
} from "../../validators/iam/auth.validators";
import {validateRequest} from "../../middlewares/validate-request";

const router = express.Router();

// parent -> /iam/auth

router.post('/register', registerValidator, validateRequest, registerController);
router.post('/token', tokenValidator, validateRequest, tokenController);
router.post('/forgot-password', forgotPasswordValidator, validateRequest, forgotPasswordController);
router.post('/reset-password/:token', resetPasswordValidator, validateRequest, resetPasswordController);
router.get('/current-user', currentUserController);
router.post('/logout', signOutController);

export const AuthRouter = router;
