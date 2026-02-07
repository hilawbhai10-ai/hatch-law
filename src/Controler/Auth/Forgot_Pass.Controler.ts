import { EmailVerificationServiceLayer, OtpVerificationServiceLayer } from "../../Service/auth/Forgot_Password.Service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
import type { Request, Response } from "express";


const Is_Secure = false

export const EmailVerificationControler = async (
    req: Request,
    res: Response
) => {

    let token;
    try {
        token = await EmailVerificationServiceLayer(req.body.Email)
    } catch (err: any) {
        if (err.statusCode === Status_Codes.INTERNAL_SERVER_ERROR) return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
            Error: "Internal Server Error"
        })
        if (err.statusCode === Status_Codes.BAD_REQUEST) return res.status(Status_Codes.BAD_REQUEST).json({ Error: "Invalid Email or not found" })

    }

    res.cookie("EmailVerificationToken", token!, {
        httpOnly: true,
        secure: Is_Secure,
        maxAge: 1000 * 60 * 15,
        sameSite: "lax",
        path: "/apis/Hatch/Auth/Forgot-Password/Email-Verification"
    });

    return res.status(Status_Codes.NO_CONTENT).json({})
}


export const OtpVerificationControler = async (
    req: Request,
    res: Response,
) => {
    const cahched_ID = req.body.Email_Verification_token.Cache_ID

    let token;
    try {
        token = await OtpVerificationServiceLayer(Number(req.body.OTP), cahched_ID)
    } catch (err: any) {
        if (err.statusCode === Status_Codes.INTERNAL_SERVER_ERROR) return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
            Error: "Internal Server Error"
        })
        if (err.statusCode === Status_Codes.UNAUTHORIZED) return res.status(Status_Codes.UNAUTHORIZED).json({
            Error: "Invalid or Expired Cookie"
        })
        if (err.statusCode === Status_Codes.BAD_REQUEST) return res.status(Status_Codes.BAD_REQUEST).json({
            Error: "Invalid OTP"
        })
    } 


    res.clearCookie("EmailVerificationToken", {
        httpOnly: true,
        secure: Is_Secure,
        maxAge: 1000 * 60 * 15,
        sameSite: "lax",
        path: "/apis/Hatch/Auth/Forgot-Password/Email-Verification"
    })


    res.cookie("PasswordChangeToken",token!,{ // FIX THE NAMING
        httpOnly: true,
        secure: Is_Secure,
        maxAge: 1000 * 60 * 15,
        sameSite: "lax",
        path: "/apis/Hatch/Auth/Forgot-Password/change-password" // Naming ISSUE
    })

    res.status(Status_Codes.NO_CONTENT).json({})


}

export const ChangePasswordControler = async (
    req : Request,
    res : Response
) => { 
    
}