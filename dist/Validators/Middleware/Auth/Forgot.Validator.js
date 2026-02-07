import { ForgotPassEmailVerification, FrogotPassOTPVerificationzodSchema, ForgotPassPassChangeSchema } from "../../../Utils/Zod_Validation.js";
import Status_Codes from "../../../Constant/Status_Codes.js";
import jwt from "jsonwebtoken";
const Forgot_PASS_OTP_VERIFICATION_PASS = "1234543";
const Forgot_Pass_Password_changing_Pass = "123455Y6U756432";
export const ForgotPassEmailVerificationValidator = (req, res, next) => {
    const isSchemaValid = ForgotPassEmailVerification.safeParse(req.body);
    if (!isSchemaValid.success) {
        return res.status(Status_Codes.Invalid_Entity).json({
            Error: isSchemaValid.error.flatten()
        });
    }
    next();
};
export const ForogotPassOTPVerification = (req, res, next) => {
    const Verification_Cookie = req.cookies.EmailVerificationToken;
    if (!Verification_Cookie)
        return res.status(Status_Codes.UNAUTHORIZED).json({
            Error: "Invalid or Expired Token"
        });
    let payload;
    try {
        payload = jwt.verify(Verification_Cookie, Forgot_PASS_OTP_VERIFICATION_PASS);
    }
    catch (e) {
        return res.status(Status_Codes.UNAUTHORIZED).json({
            Error: "Invalid or Expired Token"
        });
    }
    const isSchemaValid = FrogotPassOTPVerificationzodSchema.safeParse(req.body);
    if (!isSchemaValid.success)
        return res.status(Status_Codes.Invalid_Entity).json({
            Error: isSchemaValid.error.flatten()
        });
    req.body.Email_Verification_token = payload;
    next();
};
export const ForgotPassPassChangeValidator = (req, res, next) => {
    const Verification_Cookie = req.cookies.PasswordChangeToken;
    if (!Verification_Cookie)
        return res.status(Status_Codes.UNAUTHORIZED).json({
            Error: "Invalid or Expired Token"
        });
    let payload;
    try {
        payload = jwt.verify(Verification_Cookie, Forgot_Pass_Password_changing_Pass);
    }
    catch (e) {
        return res.status(Status_Codes.UNAUTHORIZED).json({
            Error: "Invalid or Expired Token"
        });
    }
    const isSchemaValid = ForgotPassPassChangeSchema.safeParse(req.body);
    if (!isSchemaValid.success)
        return res.status(Status_Codes.Invalid_Entity).json({
            Error: isSchemaValid.error.flatten()
        });
    req.body.Password_verification_token = payload;
    next();
};
//# sourceMappingURL=Forgot.Validator.js.map