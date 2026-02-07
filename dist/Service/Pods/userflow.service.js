import logger from "../../lib/logger.js";
import User_class from "../../Repositary/user.repository.js";
import { AppError2 } from "../../Constant/Error_Class2.js";
import Status_Codes from "../../Constant/Status_Codes.js";
const User = new User_class();
const Maximum_number_of_PODS = 5;
export const PodsJoiningService = async (obj // for now 
) => {
    // check pod limit 
    let pods;
    try {
        pods = await User.Get_Pods({ Id: obj.Id });
    }
    catch (err) {
        throw new AppError2("Internal Server Error", // message
        Status_Codes.INTERNAL_SERVER_ERROR, // statusCode
        "UserService", // service_name
        "DB", err.message, "Database Query failed");
    }
    if (!pods || !pods.Pods || pods.Maximum_Pods === undefined)
        return { Status_Codes: Status_Codes.BAD_REQUEST, Reason: "ID Not found" };
    if (pods?.Pods?.length >= pods?.Maximum_Pods)
        return { Status_Codes: Status_Codes.FORBIDDEN, Reason: "Limit Already Reached for maximum Pods" };
    if (!obj.isPublic) {
    }
};
//# sourceMappingURL=userflow.service.js.map