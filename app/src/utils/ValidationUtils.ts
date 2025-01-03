export class ValidationUtils {
    // Función para validar cadenas no vacías
    public static validateNotEmptyString(cadena: string, campo: string): boolean {
        if (cadena.trim().length === 0) {
            console.error(`${campo} no puede estar vacío.`);
            return false;
        }
        return true;
    }

    // Función para validar correo electrónico
    public static validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.error("El correo electrónico no es válido.");
            return false;
        }
        return true;
    }

    // Función para validar fecha de nacimiento
    public static validateBirthday(birthDate: Date): boolean {
        const today = new Date();
        if (birthDate >= today) {
            console.error("La fecha de nacimiento no puede ser en el futuro.");
            return false;
        }
        return true;
    }

    // Función para validar que un número sea positivo
    public static validateNotNegativeNumber(numero: number, campo: string): boolean {
        if (numero < 0) {
            console.error(`${campo} debe ser un número positivo.`);
            return false;
        }
        return true;
    }
}