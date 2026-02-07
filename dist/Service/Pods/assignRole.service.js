import { PodRepo } from "../../Repository/pods.repository.js";
import Status_Codes from "../../Constant/Status_Codes.js";
export const assignRoleService = async (req) => {
    const podId = req.pod?.uuid;
    const actingUserId = req.user?.id;
    const actingRole = req.pod?.role;
    const { userId, role } = req.body;
    const allowedRoles = ["admin", "mod", "member", "viewer"];
    if (!podId) {
        throw {
            code: Status_Codes.NOT_FOUND,
            message: "Pod not found",
        };
    }
    if (!req.pod?.isMember) {
        throw {
            code: Status_Codes.FORBIDDEN,
            message: "You are not a member of this pod",
        };
    }
    if (actingRole !== "owner") {
        throw {
            code: Status_Codes.FORBIDDEN,
            message: "Only owner can assign roles",
        };
    }
    if (!userId || !role) {
        throw {
            code: Status_Codes.BAD_REQUEST,
            message: "userId and role required",
        };
    }
    if (!allowedRoles.includes(role)) {
        throw {
            code: Status_Codes.BAD_REQUEST,
            message: "Invalid role",
        };
    }
    // Prevent Owner Self Demotion 
    if (userId === actingUserId && role !== "owner") {
        throw {
            code: Status_Codes.FORBIDDEN,
            message: "Owner cannot demote themselves",
        };
    }
    const result = await PodRepo.Update_Member_Role(podId, userId, role);
    if (!result?.IsSucces) {
        throw {
            code: Status_Codes.INTERNAL_SERVER_ERROR,
            message: "Failed to assign role",
        };
    }
    return { success: true };
};
//# sourceMappingURL=assignRole.service.js.map