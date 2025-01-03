// utils/LogUtils.ts
import * as fs from 'fs';
import * as path from 'path';

export class LogUtils {
    // Método para escribir en un archivo de log específico
    public static writeLog(message: string, logType: string = 'trace-log.txt'): void {
        // Establecer el directorio de logs y la ruta del archivo
        const logDirectory: string = path.join(__dirname, '..', 'logs');
        const logFilePath: string = path.join(logDirectory, logType);

        // Verificar si el directorio existe, si no, crearlo
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }

        // Escribir el mensaje en el archivo de log
        fs.appendFile(logFilePath, message, (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de logs:', err);
            }
        });
    }

    // Método para limpiar el contenido de un archivo de log
    public static clearLogContent(logType: string = 'trace-log.txt'): void {
        const logDirectory: string = path.join(__dirname, '..', 'logs');
        const logFilePath: string = path.join(logDirectory, logType);

        // Verificar si el archivo existe
        if (fs.existsSync(logFilePath)) {
            fs.writeFile(logFilePath, '', (err) => {
                if (err) {
                    console.error('Error al limpiar el archivo de logs:', err);
                } else {
                    console.log(`Contenido del archivo ${logType} limpiado con éxito.`);
                }
            });
        } else {
            console.log(`No existe el archivo de logs ${logType} para limpiar.`);
        }
    }
}