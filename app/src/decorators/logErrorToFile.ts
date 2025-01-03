import { LogUtils } from '../utils/LogUtils';

export function logErrorsToFile(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        try {
            return originalMethod.apply(this, args);
        } catch (error) {
            //Hacer un casting a Error
            if (error instanceof Error) {
                const timestamp = new Date().toISOString();
                const errorMessage = `[${timestamp}] Error en método ${propertyKey}: ${error.message}\n`;
                
                LogUtils.writeLog(errorMessage, 'error-log.txt');
            }
            //Si el error no es una instancia de error 
            else 
            {
                const timestamp = new Date().toISOString();
                const errorMessage = `[${timestamp}] Error en método ${propertyKey}: Error desconocido\n`;
                LogUtils.writeLog(errorMessage, 'error-log.txt');
            }
        }
    };

    return descriptor;
}