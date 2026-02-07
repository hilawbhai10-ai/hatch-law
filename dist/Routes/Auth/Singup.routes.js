import express from "express";
import { SignupAuthControler, SignupAuthVerificationControler, SignupUserOnbardingControlerLayer } from "../../Controler/Auth/Singup.Controler.js";
import { Signup_Middleware, SignupVerificationMiddleware, SignupOnboardingQuestions } from "../../Validators/Middleware/Rest APIS/Auth/Signup.Validators.js";
const router = express.Router();
router.post("/", Signup_Middleware, SignupAuthControler);
router.post("/Email-Verify", SignupVerificationMiddleware, SignupAuthVerificationControler);
router.post("/On-boarding_Questions", SignupOnboardingQuestions, SignupOnboardingQuestions);
export default router;
//# sourceMappingURL=Singup.routes.js.map