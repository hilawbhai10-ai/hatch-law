import express from "express";
import { EmailVerificationControler, OtpVerificationControler } from "../../Controler/Auth/Forgot_Pass.Controler.js";
import { ForgotPassEmailVerificationValidator, ForogotPassOTPVerification, ForgotPassPassChangeValidator } from "../../Validators/Middleware/Rest APIS/Auth/Forgot.Validator.js";
const router = express.Router();
router.post("/", ForgotPassEmailVerificationValidator, EmailVerificationControler);
router.post("/Email-Verification", ForogotPassOTPVerification, OtpVerificationControler);
router.post("/change-password", ForgotPassPassChangeValidator);
export default router;
//# sourceMappingURL=Forgot.routes.js.map