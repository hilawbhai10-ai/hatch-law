import type { Request, Response } from "express";
import {
  SignupServiceLayer,
  SignupVerificationLayer,
  SignupUserOnbardingServiceLayer,
} from "../../Service/auth/Singup.Services.js";
import Status_Code from "../../Constant/Status_Codes.js";

const Is_Secure = false;

export const SignupAuthControler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  let Temp_Signup_token;
  try {
    Temp_Signup_token = await SignupServiceLayer(username, email, password);
  } catch (err: any) {
    if (err.statusCode === Status_Code.INTERNAL_SERVER_ERROR)
      return res.status(Status_Code.INTERNAL_SERVER_ERROR).json({
        Error: "Internal Server Error",
      });
    console.log(err);
    console.log(err.statusCode);
    if (err.statusCode === Status_Code.Conflit) {
      console.log("Did it hit??");
      return res.status(Status_Code.Conflit).json({
        Error: err.message,
      });
    }
  }

  if (!Temp_Signup_token)
    return res.status(Status_Code.INTERNAL_SERVER_ERROR).json({
      Error1: "Unknown",
    });

  res.cookie("Temp_Signup_Session", Temp_Signup_token!, {
    httpOnly: true,
    secure: Is_Secure,
    maxAge: 1000 * 60 * 15,
    sameSite: "lax",
  });

  return res.status(Status_Code.NO_CONTENT).json({});
};

export const SignupAuthVerificationControler = async (
  req: Request,
  res: Response,
) => {
  let User_Onboarding_token;
  try {
    User_Onboarding_token = await SignupVerificationLayer(
      Number(req.body.OTP),
      req.body.Redis_ID.Temp_ID,
    );
  } catch (err: any) {
    console.log(err);
    if (err.statusCode === Status_Code.INTERNAL_SERVER_ERROR)
      return res.status(Status_Code.INTERNAL_SERVER_ERROR).json({
        Error: "Internal Server Error",
      });

    if (err.statusCode === Status_Code.BAD_REQUEST)
      return res.status(Status_Code.BAD_REQUEST).json({
        Error: "Invalid OTP",
      });

    if (err.statusCode === Status_Code.UNAUTHORIZED)
      return res.status(Status_Code.UNAUTHORIZED).json({
        Error: "Token Expired or Invalid Cookie",
      });
  }

  res.clearCookie("Temp_Signup_Session", {
    httpOnly: true,
    secure: Is_Secure,
    sameSite: "lax",
  });
  res.cookie("User_Onboarding_Session", User_Onboarding_token!, {
    httpOnly: true,
    secure: Is_Secure,
    maxAge: 1000 * 60 * 15,
    sameSite: "lax",
  });

  res.status(Status_Code.OK).json({
    Questions: {
      Question1: {
        Question: "What is your favortite topic",
        Answers: ["Maths", "Coding", "ui/ux", "abc"],
      },
    },
  });
};

export const SignupUserOnbardingControlerLayer = async (
  req: Request,
  res: Response,
) => {
  let perm_token;
  try {
    perm_token = await SignupUserOnbardingServiceLayer(
      req.body.Redis_ID,
      req.body.Questions,
    );
  } catch (err: any) {
    if (err.statusCode === Status_Code.INTERNAL_SERVER_ERROR)
      return res
        .status(Status_Code.INTERNAL_SERVER_ERROR)
        .json({ Error: "Internal Server Error" });
    if (err.statusCode === Status_Code.Conflit)
      return res
        .status(Status_Code.Conflit)
        .json({ Error: "Email Already Exsits" });
    if (err.statusCode === Status_Code.UNAUTHORIZED)
      return res
        .status(Status_Code.UNAUTHORIZED)
        .json({ Error: "Expird or Invalid Cookie" });
  }

  res.clearCookie("User_Onboarding_Session", {
    httpOnly: true,
    secure: Is_Secure,
    sameSite: "lax",
  });

  res.cookie("Session", perm_token!, {
    httpOnly: true,
    secure: Is_Secure,
    sameSite: "lax",
    path: "/",
  });

  res.status(Status_Code.NO_CONTENT).json({});
};
