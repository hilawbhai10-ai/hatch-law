import { UserRepo } from "../../../Repository/user.repository.js";
import Status_Codes from "../../../Constant/Status_Codes.js";
// export const UserRepo = new User_class();
export const loadUserContext = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            return res
                .status(Status_Codes.UNAUTHORIZED)
                .json({ success: false, message: "Unauthorized", code: Status_Codes.UNAUTHORIZED });
        }
        if (req.user.context) {
            return next();
        }
        const userResult = await UserRepo.Get_User_without_err_handaling({ id: req.user.id }, false);
        if (!userResult) {
            return res
                .status(Status_Codes.NOT_FOUND)
                .json({ success: false, message: "User not found", code: Status_Codes.NOT_FOUND });
        }
        const user = userResult;
        req.user.context = {
            username: user.username,
            email: user.email,
            createdPodsCount: user.createdPodsCount,
            subscriptionTier: user.subscriptionTier,
        };
        next();
    }
    catch (err) {
        console.error("loadUserContext error:", err);
        return res.status(Status_Codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to load user context",
            code: Status_Codes.INTERNAL_SERVER_ERROR,
        });
    }
};
//# sourceMappingURL=loadUserContexts.js.map