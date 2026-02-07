import jwt from "jsonwebtoken";
import Status_Codes from "../../../../Constant/Status_Codes.js";
const PERM_TOKEN_PASSWORD = process.env.PERM_TOKEN_PASSWORD || "hrfdguvigruofgruofgr";
export const SessionCheckingMiddleware = (req, res, next) => {
    const Session = req.cookies.Session;
    console.log(Session);
    let decoded;
    try {
        decoded = jwt.verify(Session, PERM_TOKEN_PASSWORD);
    }
    catch (e) {
        console.log(e);
        return res.status(Status_Codes.UNAUTHORIZED).json({
            Error: "Expired or Invalid Token"
        });
    }
    req.body = req.body ?? {};
    req.body.User = decoded;
    console.log(decoded);
    next();
};
//# sourceMappingURL=Session.Middleware.js.map