declare enum Status_Codes {
    OK = 200,// Successful request
    CREATED = 201,// Resource created
    NO_CONTENT = 204,// Success, no response body
    BAD_REQUEST = 400,// Validation / malformed request
    UNAUTHORIZED = 401,// Missing or invalid auth
    FORBIDDEN = 403,// No permission
    NOT_FOUND = 404,// Resource not found
    TOO_MANY_REQUESTS = 429,// Rate limiting
    Invalid_Entity = 422,
    Conflit = 409,
    INTERNAL_SERVER_ERROR = 500
}
export default Status_Codes;
//# sourceMappingURL=Status_Codes.d.ts.map