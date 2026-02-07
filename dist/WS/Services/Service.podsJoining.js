import User_class from "../../Repositary/user.repository.js";
// Deprecated WS joining service. Use `src/services/pods/join.service.ts` instead.
export const deprecatedJoiningService = () => {
    throw new Error('WS joining service removed. Use join.service.ts');
};
const User = new User_class();
const PodsFinderEvent = new QueueEvents("PodsFinder", {
    connection: Redis_Client_Workers
});
const Pods_Maximum_User = 9;
export const JoiningPods = async (socket, payload, RequestId) => {
    payload;
    const Id = socket.Session?.ID;
    console.log(Id);
    let PodsData;
    try {
        PodsData = await User.Get_Pods({ Id });
    }
    catch (err) {
        logger.error(err, {}); // need to log this 
        console.log(err);
    } // return the data from here 
    if (!PodsData)
        return;
    const podsCount = PodsData.Pods?.length ?? 0;
    const maxUsers = PodsData.Maximum_Pods; // by default 5 in db 
    if (maxUsers >= podsCount) {
        return Sendmessage({
            type: "error",
            event: Events.Pods_Joining,
            requestId: socket.RequestId,
            success: false,
            data: null,
            error: {
                message: "User Maximim Pods limits reached"
            }
        }, Events.Pods_Joining, socket, RequestId);
    }
    console.log("Service passed");
    console.log(`is public ${payload.isPublic}`);
    if (payload.isPublic) {
        let Pod;
        try {
            const PodsFinderJob = await Pods.add("PodsFinder", {
                UserID: Id,
                Already_Exsiting_Pods: PodsData.Pods,
            });
            console.log(PodsData?.Pods);
            Pod = await PodsFinderJob.waitUntilFinished(PodsFinderEvent);
            console.log(Pod);
        }
        catch (err) {
        }
    }
};
//# sourceMappingURL=Service.podsJoining.js.map