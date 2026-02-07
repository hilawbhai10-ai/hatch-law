import express from "express";
import { SessionCheckingMiddleware } from "../../Validators/Middleware/Rest APIS/User Guards/Session.Middleware.js";
import { RefreshTokenControler } from "../../Controler/Auth/Tokens.controler.js";
const router = express.Router();
router.get("/refresh-token", SessionCheckingMiddleware, RefreshTokenControler);
export default router;
//# sourceMappingURL=tokens.routes.js.map