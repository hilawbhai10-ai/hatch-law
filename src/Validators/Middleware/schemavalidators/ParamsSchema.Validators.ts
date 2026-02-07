import type {Request,Response , NextFunction} from "express" 
import type { ZodTypeAny } from "zod"
import Status_Codes from "../../../Constant/Status_Codes.js"

export const ParamsValidators = 
(schema : ZodTypeAny,key : string) =>
(
    req : Request, 
    res : Response,
    next : NextFunction
) => { 
    const value = req.query[key]

    const IsSchemaValid = schema.safeParse({ [key]: value })
    if (!IsSchemaValid.success) return res.status(Status_Codes.Invalid_Entity).json({
        Error : IsSchemaValid.error.flatten()
    })

    next()
} 