import { confirmJoinService } from "../../Service/pods/confirmJoin.service.js";
export const confirmJoinController = async (req, res, next) => {
    try {
        const data = await confirmJoinService(req);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=confirmJoin.controller.js.map