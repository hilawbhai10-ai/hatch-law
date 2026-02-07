import User_class from "../../Repository/user.repository.js";
import crypto from "crypto";
import Status_Codes from "../../Constant/Status_Codes.js"
import { AppError2 } from "../../Constant/Error_Class2.js";
import { error } from "console";

const User = new User_class()

export const GetUserServiceLayer = async (
    User_ID: string
) => {

    let userData;
    try {
        userData = await User.Get_User_without_err_handaling({ id: User_ID })
        if (!userData) return null
    } catch (e:any) {
        throw new AppError2(
            "Internal Server Error",          // message
            Status_Codes.INTERNAL_SERVER_ERROR, // statusCode
            "UserService",                    // service_name
            "DB",
            e?.message ?? String(e),
            "Database Query failed",                        // error_caused (since DB call failed)
        )
    }

    return {
        id: userData.id,
        username: userData.username,
        email: userData.email ?? null,
        avatarUrl: userData.avatarUrl ?? null,
        maximumPods: userData.maximumPods,
        accountStatus: userData.accountStatus,
    }
}

export const GetPublicUserServiceLayer = async (
    User_ID: string
) => {

    let userData;
    try {
        userData = await User.Get_User_without_err_handaling({ id: User_ID })
        if (!userData) return null
    } catch (e:any) {
        throw new AppError2(
            "Internal Server Error",          // message
            Status_Codes.INTERNAL_SERVER_ERROR, // statusCode
            "UserService",                    // service_name
            "DB",
            e?.message ?? String(e),
            "Database Query failed",                        // error_caused (since DB call failed)
        )
    }

    return {
        id: userData.id,
        username: userData.username,
        avatarUrl: userData.avatarUrl ?? null,
    }
}
