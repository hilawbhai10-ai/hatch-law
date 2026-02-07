import User_class from "../../Repository/user.repository.js";
import { AppError } from "../../Constant/Error_Class.js";
import Status_Codes from "../../Constant/Status_Codes.js";
import { generate4DigitNumber, generate9DigitNumber } from "../../Utils/Utils_func.js";
import Redis_Client from "../../config/Redis_instances.js";
import sendotp from "../../Utils/send_otp.js";
import jwt from "jsonwebtoken";
import dotenv from "process";
import bcrypt from "bcrypt";
import { email } from "zod";
// import path from "path"
import { UserRepo } from "../../Repository/user.repository.js";
// dotenv.config(path : )
const SALT_ROUNDS = 12;
const Forgot_PASS_OTP_VERIFICATION_PASS = "1234543"; // FIX the naming 
const Forgot_Pass_Password_changing_Pass = "123455Y6U756432";
export const EmailVerificationServiceLayer = async (Email) => {
    const IsUserExsits = await UserRepo.isUserExists(Email, undefined);
    // if (IsUserExsits.Error_Code !== "200") throw new AppError("Internal Server Error",
    //     Status_Codes.INTERNAL_SERVER_ERROR
    // )
    if (!IsUserExsits.emailExists)
        throw new AppError("Email Not Found", Status_Codes.BAD_REQUEST);
    const OTP = generate4DigitNumber();
    const Cache_ID = generate9DigitNumber();
    try {
        await Redis_Client.set(`auth:forgot_password:reset:${Cache_ID}`, JSON.stringify({
            OTP: OTP,
        }), "EX", 900);
        // await sendotp(OTP, Email)
    }
    catch (e) {
        throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
    }
    const Token = jwt.sign({ Cache_ID: Cache_ID }, Forgot_PASS_OTP_VERIFICATION_PASS, { expiresIn: "15m" });
    return Token;
};
export const OtpVerificationServiceLayer = async (OTP, Cache_ID) => {
    let Cached_payload;
    console.log(Cache_ID);
    try {
        Cached_payload = await Redis_Client.getdel(`auth:forgot_password:reset:${Cache_ID}`);
        if (!Cached_payload)
            throw new AppError("Invlaid or Expired Cookie", Status_Codes.UNAUTHORIZED);
        Cached_payload = JSON.parse(Cached_payload);
    }
    catch (err) {
        if (err instanceof AppError) {
            throw new AppError(err.message, err.statusCode);
        }
        throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
    }
    if (Number(Cached_payload.OTP) !== OTP)
        throw new AppError("Invalid OTP", Status_Codes.BAD_REQUEST);
    const CacheID = generate9DigitNumber();
    try {
        await Redis_Client.set(`auth:forgot_password:password_reset:${String(CacheID)}`, JSON.stringify({
            Verifyed: true
        }), "EX", "900");
    }
    catch (e) {
        throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
    }
    const Token = jwt.sign(JSON.stringify({ User_ID: CacheID }), Forgot_Pass_Password_changing_Pass);
    return Token;
};
export const ResetPasswordServiceLayer = async (New_Password, Cache_ID) => {
    let IsChangingtrue;
    try {
        IsChangingtrue = await Redis_Client.getdel(`auth:forgot_password:password_reset:${Cache_ID}`);
        if (!IsChangingtrue)
            throw new AppError("Invalid or Expired Cookie", Status_Codes.UNAUTHORIZED);
    }
    catch (err) {
        if (err instanceof AppError && err.statusCode === Status_Codes.UNAUTHORIZED)
            throw new AppError(err.message, err.statusCode);
        throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
    }
    const hashedPassword = await bcrypt.hash(New_Password, SALT_ROUNDS);
    // User.EditUser({Email : email})
};
//# sourceMappingURL=Forgot_Password.Service.js.map