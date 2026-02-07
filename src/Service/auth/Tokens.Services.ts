import jwt from "jsonwebtoken"
import logger from "../../lib/logger.js"
import type { LogSchema } from "../../types/logger.types.js"
import crypto from "crypto"


const PERM_TOKEN_PASSWORD = process.env.PERM_TOKEN_PASSWORD || "hrfdguvigruofgruofgr"



export const RefreshTokenServiceLayer = (
    User_ID : string
): string => {
    const request_id = crypto.randomUUID()
    console.log(User_ID)
    const Token =  jwt.sign({ID : User_ID}, PERM_TOKEN_PASSWORD, {expiresIn : "30d"})
    return Token;

    
}