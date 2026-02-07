// import express from "express"
// import { SessionCheckingMiddleware } from "../../Validators/Middleware/Rest APIS/User Guards/Session.Middleware.js";
// import { LoggerMiddleware } from "../../Validators/Middleware/Rest APIS/logger_middlewares/logger.middleware.js";
// import { ErrorLogermiddleware } from "../../Validators/Middleware/Rest APIS/logger_middlewares/ErrorLoger.middleware.js";
// import { Pods_Zoining_Schema } from "../../Utils/Zod_Validation.js";
// import { Validators } from "../../Validators/Middleware/Rest APIS/Schema Validators/BodySchema.Validators.js";
// import { JoiningPodsControler } from "../../Controler/Pods/user.controlers.js";

// const router = express.Router()


// router.post("/Join-pods",
//     LoggerMiddleware,
//     Validators(Pods_Zoining_Schema),
//     SessionCheckingMiddleware,
//     async (req,res,next) => {
//         try { 
//             await JoiningPodsControler(req,res,next)
//         }catch(err){
//             ErrorLogermiddleware(err, req, res, next)
//         }
//     }
    

// )

// export default router; 
