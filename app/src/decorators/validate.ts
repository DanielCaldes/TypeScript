export function validate(validationFn: Function, campo: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (descriptor.set) {
            // Validación para setters
            const originalSetter = descriptor.set;

            descriptor.set = function (value: any) {
                if (validationFn(value, campo)) {
                    originalSetter?.call(this, value);
                }
            };
        } else if (descriptor.value) {
            // Validación para métodos
            const originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
                if (args.some((arg) => !validationFn(arg, campo))) {
                    console.warn(`Validación fallida para el campo: ${campo}`);
                    return;
                }

                return originalMethod.apply(this, args);
            };
        }
    };
}