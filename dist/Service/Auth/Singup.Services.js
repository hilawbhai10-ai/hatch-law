import User_class from "../../Repository/user.repository.js";
import { AppError } from "../../Constant/Error_Class.js";
import Status_Codes from "../../Constant/Status_Codes.js";
import Redis_Client from "../../config/Redis_instances.js";
import { generate4DigitNumber, generate9DigitNumber, } from "../../Utils/Utils_func.js";
import jwt from "jsonwebtoken";
import sendotp from "../../Utils/send_otp.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserRepo } from "../../Repository/user.repository.js";
dotenv.config({ path: "" }); // need to configure that
const Temp_JWT_Pass = process.env.Temp_JWT_Pass || "pehdfruhfuir4hufr";
const USER_ONBOARDING_JWT_PASS = process.env.User_ONBOARDING_JWT_PASS || "HRHGFRGRYI";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 5;
const PERM_TOKEN_PASSWORD1 = process.env.PERM_TOKEN_PASSWORD || "hrfdguvigruofgruofgr";
// const User = new User_class();
export const SignupServiceLayer = async (password, 
// DOB: string,
username, email) => {
    console.log("tested");
    const IsUserExistsErrs = [];
    const IsUserExists = await UserRepo.isUserExists(email, username);
    if (IsUserExists.emailExists) {
        IsUserExistsErrs.push({
            Error_key: "Email",
            Error: "Email already exsits",
        });
        if (IsUserExists.usernameExists) {
            IsUserExistsErrs.push({
                Error_key: "Username",
                Error: "Username already exsits",
            });
        }
        if (IsUserExistsErrs.length > 0) {
            // console.log(IsUserExistsErrs.map(e => `Error Key : ${e.Error_key} Error : ${e.Error}`).join(", "))
            throw new AppError(IsUserExistsErrs.map((e) => `{Error Key : ${e.Error_key}, Error : ${e.Error}}`).join(", "), Status_Codes.Conflit);
        }
        const OTP = generate4DigitNumber();
        const Redis_ID = generate9DigitNumber();
        try {
            await Redis_Client.set(`auth:signup:email_verification:${String(Redis_ID)}`, JSON.stringify({
                username,
                email,
                // DOB,
                password,
                OTP,
                // Name,
            }), "EX", "900");
            // await sendotp(OTP, Email)
        }
        catch (e) {
            throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
        }
        const Signup_verification_token = jwt.sign({ Temp_ID: Redis_ID }, Temp_JWT_Pass, { expiresIn: "15m" }); // need to set expiry
        return Signup_verification_token;
    }
};
export const SignupVerificationLayer = async (OTP, Redis_Id) => {
    console.log(Redis_Id);
    let rawUser;
    try {
        rawUser = await Redis_Client.getdel(`auth:signup:email_verification:${Redis_Id}`); // need to do getdel
    }
    catch (e) {
        throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
    }
    if (!rawUser)
        throw new AppError("Invalid or Expired Cookie", Status_Codes.UNAUTHORIZED);
    const rawUser_cache = JSON.parse(rawUser);
    if (OTP !== rawUser_cache.OTP)
        throw new AppError("Invalid OTP", Status_Codes.BAD_REQUEST);
    const NEWREDISID = generate9DigitNumber();
    try {
        await Redis_Client.set(`auth:signup:UserOnboarding:${NEWREDISID}`, JSON.stringify({
            username: rawUser_cache.username,
            email: rawUser_cache.email,
            // DOB: User_cache.DOB,
            password: rawUser_cache.password,
            // Name: User_cache.Name,
        }), "EX", "900");
    }
    catch (e) {
        throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
    }
    const User_Onboarding_token = jwt.sign({ User_Onboarding_token: NEWREDISID }, USER_ONBOARDING_JWT_PASS, { expiresIn: "15m" }); // need to set expiry
    return User_Onboarding_token;
};
export const SignupUserOnbardingServiceLayer = async (Redis_ID, Questions) => {
    const raw = await Redis_Client.get(`auth:signup:UserOnboarding:${Redis_ID}`);
    if (!raw) {
        throw new AppError("Invalid or expired token", Status_Codes.UNAUTHORIZED);
    }
    const userData = JSON.parse(raw);
    let hashedPassword = null;
    if (userData.password) {
        hashedPassword = await bcrypt.hash(userData.password, Number(SALT_ROUNDS));
    }
    const result = await UserRepo.Create_User({
        email: userData.email,
        username: userData.username,
        password: hashedPassword,
    });
    if (!result.IsSucces) {
        if (result.Error_Code === "P2002") {
            throw new AppError("User already exists", Status_Codes.Conflit);
        }
        throw new AppError("Internal Server Error", Status_Codes.INTERNAL_SERVER_ERROR);
    }
    const createdUser = await UserRepo.Get_User({
        username: userData.Username,
    });
    const perm_token = jwt.sign({ id: createdUser.Obj.id }, PERM_TOKEN_PASSWORD1, { expiresIn: "30d" });
    return perm_token;
};
//# sourceMappingURL=Singup.Services.js.map