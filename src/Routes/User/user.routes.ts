import express from "express";
import { GetUserDataControler,GetUserPublicDataControler } from "../../Controler/User/user.controler.js";
import { ErrorLogermiddleware } from "../../Validators/Middleware/logger/ErrorLoger.middleware.js";
import { UserPublicInfoShema } from "../../Utils/Zod_Validation.js";
import { ParamsValidators } from "../../Validators/Middleware/schemavalidators/ParamsSchema.Validators.js";
import { SessionCheckingMiddleware } from "../../Validators/Middleware/shared/Session.Middleware.js";
import { LoggerMiddleware } from "../../Validators/Middleware/logger/logger.middleware.js";


const router = express.Router();

router.get(
  "/@me",
  LoggerMiddleware,
  SessionCheckingMiddleware,
  async (req, res, next) => { // its a bad practice , but hows gona look (its not opensource lmao)
    try {
      await GetUserDataControler(req, res, next);
    } catch (err) {
      ErrorLogermiddleware(err, req, res, next); 
    }
  }
);


router.get(
  "/",
  LoggerMiddleware,
  ParamsValidators(UserPublicInfoShema,"Id"),
  SessionCheckingMiddleware,
  async (req,res,next) => {
    try { 
      await GetUserPublicDataControler(req,res,next)
    }catch(err){
      ErrorLogermiddleware(err, req, res, next)
    }
  }
)

export default router; 