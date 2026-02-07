import type {Request,  Response, NextFunction } from "express";
import Status_Codes from "../../Constant/Status_Codes.js";
import { GetUserServiceLayer,GetPublicUserServiceLayer } from "../../Service/user/user.services.js";
// import type AppRequest from "../../types/Extend_Requests.js";

export const GetUserDataControler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.User?.ID;

  if (!userId || typeof userId !== "string") {
    return res.status(Status_Codes.Invalid_Entity).json({
      Error: "Invalid ID"
    });
  }

  try {
    const User_data = await GetUserServiceLayer(String(userId));

    if (!User_data) {
      return res.status(Status_Codes.BAD_REQUEST).json({
        Error: "ID not found"
      });
    }

    return res.status(Status_Codes.OK).json({
      User: User_data
    });
  } catch (err: any) {
    // req.hasError = true; // skip info/warn logs
    res.json("getuserdatacontroler error");
    next(err);           // pass error to ErrorLogermiddleware

    throw err
  }
};

export const GetUserPublicDataControler = async (
  req : Request,
  res : Response,
  next : NextFunction
) => { 

  const UserID = req.query.Id
  

  if (!UserID || typeof UserID !== "string") { 
    return res.status(Status_Codes.Invalid_Entity).json({
      Error: "Invalid ID"
    });
  }

  try {
    const UserData = await GetPublicUserServiceLayer(String(UserID))
    if (!UserData) return res.status(Status_Codes.BAD_REQUEST).json({Error : "ID Not Found "})

      res.status(Status_Codes.OK).json({
        User : UserData
      })
  }catch(err : any) {
    // req.hasError = true; // skip info/warn logs
    res.json("GetUserPublicDataControler error")
    next(err)

    throw err
}
}
