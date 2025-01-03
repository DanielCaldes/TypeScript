import { LogUtils } from '../utils/LogUtils';

export function logTraceToFile(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        
        const timestamp = new Date().toISOString();

        const logMessage = `[${timestamp}] Llamada al método: ${propertyKey} con parámetros: ${JSON.stringify(args)}\n`;

        LogUtils.writeLog(logMessage);

        return originalMethod.apply(this, args);
    };

    return descriptor;
}