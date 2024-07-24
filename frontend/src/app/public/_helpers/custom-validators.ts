import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static passwordsMatching: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        const password = formGroup.get('password')?.value;
        const passwordConfirm = formGroup.get('passwordConfirm')?.value;

        if((password === passwordConfirm)){
            return null;
        }
        else{
            return {passwordsNotMatching: true};
        }
    }
}