// Temporary Auth Service for JWT and OAuth
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findOrCreateUserByOAuth, createUserWithPassword, findUserById, findUserByEmail, } from "../Repository/tempAuth.repository.js";
/* -------------------------------------------------------------------------- */
/*                               CONFIGURATION                                */
/* -------------------------------------------------------------------------- */
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkeyforhatchtempauth";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const SESSION_SECRET = process.env.PERM_TOKEN_PASSWORD || "lawbhaixyz";
const SESSION_EXPIRES_IN = process.env.SESSION_EXPIRES_IN || "7d";
const SALT_ROUNDS = 10;
/* -------------------------------------------------------------------------- */
/*                                OAUTH SIGNUP                                */
/* -------------------------------------------------------------------------- */
export const handleOAuthSignupService = async (oauthProfile) => {
    console.log("Handling OAuth Signup Service:", oauthProfile);
    try {
        const user = await findOrCreateUserByOAuth(oauthProfile);
        if (!user) {
            return {
                success: false,
                message: "Failed to find or create user",
            };
        }
        const token = generateJWTService(user.id);
        return {
            success: true,
            message: "OAuth signup service processed",
            userId: user.id,
            token,
        };
    }
    catch (error) {
        console.error("Error in handleOAuthSignupService:", error);
        return {
            success: false,
            message: "Internal server error during OAuth signup",
        };
    }
};
/* -------------------------------------------------------------------------- */
/*                              SIMPLE EMAIL SIGNUP                           */
/* -------------------------------------------------------------------------- */
export const simpleSignupService = async (email, password_plain) => {
    console.log("Handling simple signup service for email:", email);
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return {
                success: false,
                message: "User with this email already exists",
            };
        }
        const hashedPassword = await bcrypt.hash(password_plain, SALT_ROUNDS);
        const newUser = await createUserWithPassword(email, hashedPassword);
        const token = generateJWTService(newUser.id);
        return {
            success: true,
            message: "User signed up successfully",
            userId: newUser.id,
            token,
        };
    }
    catch (error) {
        console.error("Error in simpleSignupService:", error);
        return {
            success: false,
            message: error.message ||
                "Internal server error during simple signup",
        };
    }
};
/* -------------------------------------------------------------------------- */
/*                              SIMPLE EMAIL SIGNIN                           */
/* -------------------------------------------------------------------------- */
export const simpleSigninService = async (email, password_plain) => {
    console.log("Handling simple signin service for email:", email);
    try {
        const user = await findUserByEmail(email);
        if (!user || !user.password) {
            return {
                success: false,
                message: "Invalid credentials",
            };
        }
        const match = await bcrypt.compare(password_plain, user.password);
        if (!match) {
            return {
                success: false,
                message: "Invalid credentials",
            };
        }
        const token = generateJWTService(user.id);
        return {
            success: true,
            message: "Signin successful",
            userId: user.id,
            token,
        };
    }
    catch (error) {
        console.error("Error in simpleSigninService:", error);
        return {
            success: false,
            message: error.message ||
                "Internal server error during signin",
        };
    }
};
/* -------------------------------------------------------------------------- */
/*                             TOKEN GENERATION                               */
/* -------------------------------------------------------------------------- */
export const generateJWTService = (userId) => {
    console.log("Generating JWT for user:", userId);
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
/* -------------------------------------------------------------------------- */
/*                         SESSION TOKEN (LONG TERM)                          */
/* -------------------------------------------------------------------------- */
export const generateSessionToken = (userId) => {
    return jwt.sign({ userId }, SESSION_SECRET, {
        expiresIn: SESSION_EXPIRES_IN,
    });
};
/* -------------------------------------------------------------------------- */
/*                             JWT VERIFICATION                               */
/* -------------------------------------------------------------------------- */
export const verifyJWTService = (token) => {
    console.log("Verifying JWT:", token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {
            isValid: true,
            userId: decoded.userId,
        };
    }
    catch (error) {
        console.error("Error verifying JWT:", error);
        return {
            isValid: false,
            message: error.message,
        };
    }
};
//# sourceMappingURL=tempAuth.service.js.map