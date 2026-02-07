import jwt from "jsonwebtoken";
import Status_Codes from "../../../Constant/Status_Codes.js";
const SESSION_SECRET = process.env.PERM_TOKEN_PASSWORD || "lawbhaixyz";
export const SessionCheckingMiddleware = (req, res, next) => {
    const session = req.cookies?.Session;
    if (!session) {
        return res.status(Status_Codes.UNAUTHORIZED).json({
            error: "Session cookie missing"
        });
    }
    try {
        const decoded = jwt.verify(session, SESSION_SECRET);
        req.user = { id: decoded.userId };
        next();
    }
    catch {
        return res.status(Status_Codes.UNAUTHORIZED).json({
            error: "Invalid or expired session"
        });
    }
};
//# sourceMappingURL=Session.Middleware.js.map