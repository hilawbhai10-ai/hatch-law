import type { Request, Response, NextFunction } from "express"

import { Signup_zod_schema, SignupVerificationSchema, SignupOnboardingQuestionsSchema } from "../../../Utils/Zod_Validation.js"
import Status_Codes from "../../../Constant/Status_Codes.js" 
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: "" }) // need to configure that

const SignupVerifcatonJwtPass = process.env.Temp_JWT_Pass || "pehdfruhfuir4hufr"
const USER_ONBOARDING_JWT_PASS = process.env.User_ONBOARDING_JWT_PASS || "HRHGFRGRYI"

export const Signup_Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isSchemaValid = Signup_zod_schema.safeParse(req.body)
    if (!isSchemaValid.success) return res.status(Status_Codes.Invalid_Entity).json({ Error: isSchemaValid.error })

    next()
}


export const SignupVerificationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const Temp_Signup_Cookie = req.cookies.Temp_Signup_Session

    if (!Temp_Signup_Cookie) return res.status(Status_Codes.UNAUTHORIZED).json({
        Error: "Invalid or Expired Cookie"
    })

    try {
        jwt.verify(Temp_Signup_Cookie, SignupVerifcatonJwtPass)
    } catch (e) { return res.status(Status_Codes.UNAUTHORIZED).json({ Error: "Invalid or Expired Cookie" }) }

    const isSchemaValid = SignupVerificationSchema.safeParse(req.body)
    if (!isSchemaValid.success) return res.status(Status_Codes.Invalid_Entity).json({ Error: isSchemaValid.error })

    req.body.Redis_ID = jwt.decode(Temp_Signup_Cookie)
    console.log(req.body.Redis_ID)
    next()
}


export const SignupOnboardingQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    const User_Onboarding_Session = req.cookies.User_Onboarding_Session
    if (!User_Onboarding_Session) return res.status(Status_Codes.UNAUTHORIZED).json({
        Error: "Invalid or Expired Token"
    })

    try {
        jwt.verify(User_Onboarding_Session, USER_ONBOARDING_JWT_PASS)
    } catch (e) { return res.status(Status_Codes.UNAUTHORIZED).json({ Error: "Internal Server Error" }) }

    // const isSchemaValid = SignupOnboardingQuestionsSchema.safeParse(req.body)
    // if (!isSchemaValid.success) return res.status(Status_Codes.Invalid_Entity).json({Error : isSchemaValid.error})


    if (!req.body) req.body = {} // law if you have time fix it 
    req.body.Redis_ID = jwt.decode(User_Onboarding_Session)
    console.log("1st")
    next()

}