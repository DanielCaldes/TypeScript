"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogUtils = void 0;
// utils/LogUtils.ts
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class LogUtils {
    // Método para escribir en un archivo de log específico
    static writeLog(message, logType = 'trace-log.txt') {
        // Establecer el directorio de logs y la ruta del archivo
        const logDirectory = path.join(__dirname, '..', 'logs');
        const logFilePath = path.join(logDirectory, logType);
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
    static clearLogContent(logType = 'trace-log.txt') {
        const logDirectory = path.join(__dirname, '..', 'logs');
        const logFilePath = path.join(logDirectory, logType);
        // Verificar si el archivo existe
        if (fs.existsSync(logFilePath)) {
            fs.writeFile(logFilePath, '', (err) => {
                if (err) {
                    console.error('Error al limpiar el archivo de logs:', err);
                }
                else {
                    console.log(`Contenido del archivo ${logType} limpiado con éxito.`);
                }
            });
        }
        else {
            console.log(`No existe el archivo de logs ${logType} para limpiar.`);
        }
    }
}
exports.LogUtils = LogUtils;
