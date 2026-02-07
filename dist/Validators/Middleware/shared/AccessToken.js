import jwt from "jsonwebtoken";
import Status_Codes from "../../../Constant/Status_Codes.js";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkeyforhatchtempauth";
export const AccessTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(Status_Codes.UNAUTHORIZED).json({
            error: "Authorization header missing"
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    }
    catch {
        return res.status(Status_Codes.UNAUTHORIZED).json({
            error: "Invalid or expired access token"
        });
    }
};
//# sourceMappingURL=AccessToken.js.map