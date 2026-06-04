import { Directive } from '@angular/core';

@Directive({
  selector: 'input[appInput], select[appInput], textarea[appInput]',
  host: { class: 'input-field' },
})
export class AppInputDirective {}

@Directive({
  selector: 'input[appInputDetail], select[appInputDetail]',
  host: { class: 'input-field-detail' },
})
export class AppInputDetailDirective {}

@Directive({
  selector: 'input[appInputReadonly]',
  host: { class: 'input-field-readonly' },
})
export class AppInputReadonlyDirective {}

@Directive({
  selector: 'label[appLabel]',
  host: { class: 'label-field' },
})
export class AppLabelDirective {}

@Directive({
  selector: '[appErrorMessage]',
  host: { class: 'error-message' },
})
export class AppErrorMessageDirective {}
