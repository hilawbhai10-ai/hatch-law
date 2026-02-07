import express from "express";
import { Sigin_User_Middleware } from "../Validators/Middleware/Sigin.Validator.js";
const router = express.Router();
router.post("/", Sigin_User_Middleware);
export default router;
//# sourceMappingURL=Sigin.routes.js.map