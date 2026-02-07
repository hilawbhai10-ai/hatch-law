// Deprecated WS server - removed in favor of Socket.IO implementation under src/realtime
export const deprecatedWSServer = () => {
    throw new Error('WebSocket server removed. Use Socket.IO (src/realtime).');
};
let wss;
wss = (ENVIROMENT === "Development")
    ? new WebSocketServer({ noServer: true, perMessageDeflate: false })
    : new WebSocketServer({ server });
// export interface ExtendedSocket extends WebSocket {
//     Session: JwtPayload;
// }
wss.on("connection", (ws) => {
    const Socket = ws; // will fix it 
    ws.on("message", (raw) => {
        console.log(raw.toString());
        let Parsed_Message;
        try {
            Parsed_Message = JSON.parse(raw.toString());
        }
        catch (e) {
            console.log("JSON not valid \"Pods server\"");
            return CloseSockets(ws, "Schema was not Valid", WS_Status_codes.POLICY_VIOLATION, "Disconcection");
        }
        console.log(Parsed_Message);
        // const {Event, Payload} = Parsed_Message;
        if (!Parsed_Message || Parsed_Message.Event == null || Parsed_Message.Payload == null || Parsed_Message.requestId == null)
            return;
        console.log("avcje");
        if (Parsed_Message.Event === "Joining Pods") {
            console.log("getting here");
            PodsJoiningWrapper(Socket, Parsed_Message.Payload, Parsed_Message.requestId);
        }
    });
});
DevelopmentServer.on("upgrade", (request, socket, head) => {
    if (request.url !== "/foo") {
        socket.destroy();
        return;
    }
    // 🔥 Kill compression negotiation
    delete request.headers["sec-websocket-extensions"];
    // ✅ READ TOKEN FROM HEADER
    const token = request.headers["session"];
    if (!token || typeof token !== "string") {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\nMissing Session header");
        socket.destroy();
        return;
    }
    let payload;
    try {
        payload = jwt.verify(token, PERM_TOKEN_PASSWORD);
    }
    catch {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\nInvalid Session token");
        socket.destroy();
        return;
    }
    wss.handleUpgrade(request, socket, head, (ws) => {
        const extWs = ws;
        extWs.Session = payload;
        wss.emit("connection", extWs, request);
    });
});
DevelopmentServer.listen(8000, () => {
    console.log("Ws-Pods Is running on port 8000");
});
//# sourceMappingURL=Pods.server.js.map