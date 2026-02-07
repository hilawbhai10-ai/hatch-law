import User_class from "../Repositary/User.Repositary.js";
import { AppError2 } from "../Constant/Error_Class2.js";
const User = new User_class();
const Pods_Maximum_User = 9;
export const JoiningPods = async (socket, payload) => {
    const Id = socket.Session?.ID;
    console.log(Id);
    let PodsData;
    try {
        PodsData = await User.Get_Pods({ Id });
        if (!PodsData)
            return; // return the data from here 
        const podsCount = PodsData.Pods?.length ?? 0;
        const maxUsers = PodsData.Maximum_Pods; // by default 5 in db 
    }
    catch (err) {
    }
};
//# sourceMappingURL=Service.podsJoining.js.map