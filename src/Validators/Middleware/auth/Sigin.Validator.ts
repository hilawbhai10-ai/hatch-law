import type { Request,Response,NextFunction } from "express";
import { sigin_zod_validation_schema } from "../../../Utils/Zod_Validation.js";
import Status_Codes from "../../../Constant/Status_Codes.js";

export const Sigin_User_Middleware = (
    req : Request,
    res : Response,
    next : NextFunction
) => {
   const isSchemaValid = sigin_zod_validation_schema.safeParse(req.body)
   if (!isSchemaValid.success) return res.status(
        Status_Codes.BAD_REQUEST
   ).json({
    Error : isSchemaValid.error
   })

   next()
}