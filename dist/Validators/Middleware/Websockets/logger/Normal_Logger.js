// Deprecated WS logger - replaced by Socket.IO logging middleware under src/realtime
export const WsLogger = async (socket, payload, RequestId, next) => {
    console.warn('WsLogger is deprecated.');
    // deprecated - skip strict request id validation for WS logger
    // previously validated requestId and sent error via WS; now use Socket.IO validation instead
    console.warn('Skipping WS request id validation (deprecated).');
    try {
        await next();
    }
    catch (err) {
        console.warn('Error in deprecated WsLogger', err);
    }
};
//# sourceMappingURL=Normal_Logger.js.map