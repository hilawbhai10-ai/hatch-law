import type { Request, Response } from "express"
import { RefreshTokenServiceLayer } from "../../Service/auth/Tokens.Services.js"
import logger from "../../lib/logger.js"
import type { LogSchema } from "../../types/logger.types.js"
import crypto from "crypto"
import Status_Codes from "../../Constant/Status_Codes.js"

const Is_Secure = false;

export const RefreshTokenControler = (
    req: Request,
    res: Response
) => {
    const Start_Time = Date.now()
    const request_id = crypto.randomUUID()

    const New_token = RefreshTokenServiceLayer(req.body.User.ID)




    res.clearCookie("Session", {
        httpOnly: true,
        secure: Is_Secure,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
    })

    res.cookie("Session", New_token!, {
        httpOnly: true,
        secure: Is_Secure,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
    })

    logger.info({
        level: "info",
        message: "Suceeded",
        request_id: request_id,
        service_name: "Auth",
        method: "GET",
        url: "/refresh-token",
        status_code: Status_Codes.NO_CONTENT,
        duration: Date.now() - Start_Time,
        ip_address: req.ip,
    } as LogSchema)

    if (Date.now() - Start_Time > 4000) {
        logger.info({
            level: "warn",
            message: "Took time longer then expected",
            request_id: request_id,
            service_name: "Auth",
            method: "GET",
            url: "/refresh-token",
            status_code: Status_Codes.NO_CONTENT,
            duration: Date.now() - Start_Time,
            ip_address: req.ip,
        } as LogSchema)

    }

    res.status(Status_Codes.NO_CONTENT).json({})



}