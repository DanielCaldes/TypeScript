"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTraceToFile = logTraceToFile;
const LogUtils_1 = require("../utils/LogUtils");
function logTraceToFile(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] Llamada al método: ${propertyKey} con parámetros: ${JSON.stringify(args)}\n`;
        LogUtils_1.LogUtils.writeLog(logMessage);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
