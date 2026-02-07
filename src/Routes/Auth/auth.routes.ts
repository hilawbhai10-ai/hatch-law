import { Router } from "express";

import { Signup_Middleware } from "../../Validators/Middleware/auth/Signup.Validators.js";
import { Sigin_User_Middleware } from "../../Validators/Middleware/auth/Sigin.Validator.js";
import { SignupAuthControler, SignupAuthVerificationControler, SignupUserOnbardingControlerLayer } from "../../Controler/Auth/Singup.Controler.js";
import { ForgotPassEmailVerificationValidator } from "../../Validators/Middleware/auth/Forgot.Validator.js";
import { EmailVerificationControler, OtpVerificationControler } from "../../Controler/Auth/Forgot_Pass.Controler.js";
import { ForogotPassOTPVerification, ForgotPassPassChangeValidator } from "../../Validators/Middleware/auth/Forgot.Validator.js";
import { SessionCheckingMiddleware } from "../../Validators/Middleware/shared/Session.Middleware.js";
import { RefreshTokenControler } from "../../Controler/Auth/Tokens.controler.js";

const router = Router();

/*
// CENTRALISED ROUTING OF ALL AUTH RELATED ROUTES

// Signin Route
router.post("/signin", Sigin_User_Middleware);

// Signup Route
router.post("/signup", Signup_Middleware, SignupAuthControler);
router.post("/signup/verify", Signup_Middleware, SignupAuthVerificationControler);
router.post("/signup/onboarding", Signup_Middleware, SignupUserOnbardingControlerLayer);

// Forgot Password Route
router.post("/reset",ForgotPassEmailVerificationValidator,EmailVerificationControler)
router.post("/reset/verify",ForogotPassOTPVerification,OtpVerificationControler)
router.post("/reset/change-password",ForgotPassPassChangeValidator)

// Refresh Token Route
router.get("/refresh-token",SessionCheckingMiddleware,RefreshTokenControler)
*/


export default router;


