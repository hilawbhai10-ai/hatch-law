var Status_Codes;
(function (Status_Codes) {
    Status_Codes[Status_Codes["OK"] = 200] = "OK";
    Status_Codes[Status_Codes["CREATED"] = 201] = "CREATED";
    Status_Codes[Status_Codes["NO_CONTENT"] = 204] = "NO_CONTENT";
    Status_Codes[Status_Codes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    Status_Codes[Status_Codes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    Status_Codes[Status_Codes["FORBIDDEN"] = 403] = "FORBIDDEN";
    Status_Codes[Status_Codes["NOT_FOUND"] = 404] = "NOT_FOUND";
    Status_Codes[Status_Codes["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    Status_Codes[Status_Codes["Invalid_Entity"] = 422] = "Invalid_Entity";
    Status_Codes[Status_Codes["Conflit"] = 409] = "Conflit";
    Status_Codes[Status_Codes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(Status_Codes || (Status_Codes = {}));
// Please use the status codes according to the Errs 
export default Status_Codes;
//# sourceMappingURL=Status_Codes.js.map