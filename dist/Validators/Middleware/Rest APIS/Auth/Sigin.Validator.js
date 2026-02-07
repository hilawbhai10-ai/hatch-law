import { sigin_zod_validation_schema } from "../../../../Utils/Zod_Validation.js";
import Status_Codes from "../../../../Constant/Status_Codes.js";
export const Sigin_User_Middleware = (req, res, next) => {
    const isSchemaValid = sigin_zod_validation_schema.safeParse(req.body);
    if (!isSchemaValid.success)
        return res.status(Status_Codes.BAD_REQUEST).json({
            Error: isSchemaValid.error
        });
    next();
};
//# sourceMappingURL=Sigin.Validator.js.map