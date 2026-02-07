import Status_Codes from "../../../Constant/Status_Codes.js";
export const ParamsValidators = (schema, key) => (req, res, next) => {
    const value = req.query[key];
    const IsSchemaValid = schema.safeParse({ [key]: value });
    if (!IsSchemaValid.success)
        return res.status(Status_Codes.Invalid_Entity).json({
            Error: IsSchemaValid.error.flatten()
        });
    next();
};
//# sourceMappingURL=ParamsSchema.Validators.js.map