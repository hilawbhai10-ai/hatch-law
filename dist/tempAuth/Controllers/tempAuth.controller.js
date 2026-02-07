import { handleOAuthSignupService, simpleSignupService, simpleSigninService, generateSessionToken } from "../Services/tempAuth.service.js";
/* ----------------------------- OAUTH SIGNUP ----------------------------- */
export const tempSignupOAuth = async (req, res) => {
    const { email, oauthProvider, oauthId } = req.body;
    if (!email || !oauthProvider || !oauthId) {
        return res.status(400).json({ message: "Missing OAuth data" });
    }
    const result = await handleOAuthSignupService({
        email,
        oauthProvider,
        oauthId
    });
    if (!result.success) {
        return res.status(500).json({ message: result.message });
    }
    const sessionToken = generateSessionToken(result.userId);
    res.cookie("Session", sessionToken, {
        httpOnly: true,
        sameSite: "lax"
    });
    return res.status(200).json({
        accessToken: result.token,
        userId: result.userId
    });
};
/* ----------------------------- SIMPLE SIGNUP ----------------------------- */
export const tempSimpleSignup = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email & password required" });
    }
    const result = await simpleSignupService(email, password);
    if (!result.success) {
        return res.status(409).json({ message: result.message });
    }
    const sessionToken = generateSessionToken(result.userId);
    res.cookie("Session", sessionToken, {
        httpOnly: true,
        sameSite: "lax"
    });
    return res.status(200).json({
        accessToken: result.token,
        userId: result.userId
    });
};
/* ----------------------------- SIMPLE SIGNIN ----------------------------- */
export const tempSignin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email & password required" });
    }
    const result = await simpleSigninService(email, password);
    if (!result.success) {
        return res.status(401).json({ message: result.message });
    }
    const sessionToken = generateSessionToken(result.userId);
    res.cookie("Session", sessionToken, {
        httpOnly: true,
        sameSite: "lax"
    });
    return res.status(200).json({
        sessionToken: sessionToken,
        accessToken: result.token,
        userId: result.userId
    });
};
//# sourceMappingURL=tempAuth.controller.js.map