import { SiginUser } from "../../Service/auth/Sigin.Service.js";
import Status_Codes from "../../Constant/Status_Codes.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
const Is_Secure = false;
export const Sigin_Controler = async (req, res) => {
    const { email, username, password } = req.body;
    let token;
    try {
        token = await SiginUser(password, email ? email : username);
    }
    catch (err) {
        if (err.statusCode === Status_Codes.INTERNAL_SERVER_ERROR)
            return res
                .status(Status_Codes.INTERNAL_SERVER_ERROR)
                .json({ Error: "Internal Server Error" });
        if (err.Status_Codes === Status_Codes.NOT_FOUND)
            return res.status(Status_Codes.NOT_FOUND).json({ Error: err.message });
        if (err.Status_Codes === Status_Codes.UNAUTHORIZED)
            return res.status(Status_Codes.UNAUTHORIZED).json({ Error: err.message });
    }
    res.cookie("Session", token, {
        httpOnly: true,
        secure: Is_Secure,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: "lax",
    });
    res.status(Status_Codes.NO_CONTENT).json({});
};
//# sourceMappingURL=Sigin.Controler.js.map