import Status_Codes from "../../../Constant/Status_Codes.js";
export const Validators = (schema) => (req, res, next) => {
    const IsSchemaValid = schema.safeParse(req.body);
    if (!IsSchemaValid.success)
        return res.status(Status_Codes.Invalid_Entity).json({
            Error: IsSchemaValid.error.flatten()
        });
    next();
};
//# sourceMappingURL=BodySchema.Validators.js.map