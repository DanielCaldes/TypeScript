"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrorsToFile = logErrorsToFile;
const LogUtils_1 = require("../utils/LogUtils");
function logErrorsToFile(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        try {
            return originalMethod.apply(this, args);
        }
        catch (error) {
            //Hacer un casting a Error
            if (error instanceof Error) {
                const timestamp = new Date().toISOString();
                const errorMessage = `[${timestamp}] Error en método ${propertyKey}: ${error.message}\n`;
                LogUtils_1.LogUtils.writeLog(errorMessage, 'error-log.txt');
            }
            //Si el error no es una instancia de error 
            else {
                const timestamp = new Date().toISOString();
                const errorMessage = `[${timestamp}] Error en método ${propertyKey}: Error desconocido\n`;
                LogUtils_1.LogUtils.writeLog(errorMessage, 'error-log.txt');
            }
        }
    };
    return descriptor;
}
