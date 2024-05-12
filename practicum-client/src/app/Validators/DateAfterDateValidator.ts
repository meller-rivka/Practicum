import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export function DateAfterDateValidator(dateStart: Date | null): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve) => {
            const selectedDate = (control.value);
            if (!selectedDate || !dateStart) {
                resolve(null);
                return;
            }

            if (selectedDate >= dateStart) {
                resolve(null);
            } else {
                resolve({ dateAfterOrEqual: true });
            }
        });
    };
}
