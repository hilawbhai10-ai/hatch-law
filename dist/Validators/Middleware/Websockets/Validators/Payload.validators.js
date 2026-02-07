// Deprecated WS validator: No-op stub to preserve compatibility. Use Socket.IO side validation.
export const SchemaValidators = (Schema) => async (socket, Payload, RequestId, next) => {
    console.warn('SchemaValidators (WS) is deprecated. Use Socket.IO validation middleware.');
    await next();
};
//# sourceMappingURL=Payload.validators.js.map