import { AbstractControl } from "@angular/forms";

export function EspacoEmBrancoValidator(control: AbstractControl) {
    const value = control.value as string;
    if (value && value.trim().length === 0) {
        return { espacoEmBranco: true };
    } else {
        return null;
    }
}
