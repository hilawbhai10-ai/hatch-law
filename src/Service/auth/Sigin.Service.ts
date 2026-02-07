import User from "../../Repository/user.repository.js";
import { AppError } from "../../Constant/Error_Class.js";
import Status_Codes from "../../Constant/Status_Codes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const User_Repo = new User();

dotenv.config({ path: "../../../.env" });

const JWT_PASSWORD = process.env.JWT_PERM_TOKEN || "brhcgruigberugfbeugwv";

export const SiginUser = async (
  password: string,
  email?: string,
  username?: string,
): Promise<string> => {
  const Identifier = email ? { email } : username ? { username } : null;

  if (!Identifier) {
    throw new AppError(
      "Email or Username is required",
      700, // Our status for service related errors
    );
  }

  const User = await User_Repo.Get_User(Identifier);
  if (!User.Obj) throw new AppError("Empty User Object", 700);
  if (!User.IsSucces)
    throw new AppError(
      "Internal Server Error",
      Status_Codes.INTERNAL_SERVER_ERROR,
    );
  if (User.IsSucces && !User.Obj)
    throw new AppError(
      "Email or Username Does not exists",
      Status_Codes.NOT_FOUND,
    );

  const Iscompare = await bcrypt.compare(
    password,
    User.Obj?.password as string,
  );
  if (!Iscompare)
    throw new AppError("Invalid Email or Password", Status_Codes.UNAUTHORIZED);

  const token = jwt.sign({ id: User.Obj.id }, JWT_PASSWORD);
  return token;
};
