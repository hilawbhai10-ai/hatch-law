import type {Request,Response , NextFunction} from "express" 
import type { ZodTypeAny } from "zod"
import Status_Codes from "../../../Constant/Status_Codes.js"

export const Validators = 
(schema : ZodTypeAny) =>
(
    req : Request, 
    res : Response,
    next : NextFunction
) => { 
    
    const IsSchemaValid = schema.safeParse(req.body)
    if (!IsSchemaValid.success) return res.status(Status_Codes.Invalid_Entity).json({
        Error : IsSchemaValid.error.flatten()
    })

    next()
}