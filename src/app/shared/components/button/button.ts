import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'dark'
  | 'ghost';

export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

const BASE =
  'inline-flex items-center justify-center box-border border border-transparent shadow-xs font-medium leading-5 rounded-base focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

const SIZES: Record<ButtonSize, string> = {
  xs: 'text-xs px-3 py-1.5',
  sm: 'text-sm px-3 py-2',
  base: 'text-sm px-4 py-2.5',
  lg: 'text-base px-5 py-3',
  xl: 'text-base px-6 py-3.5',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium',
  secondary:
    'text-body bg-neutral-secondary-medium border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary',
  tertiary:
    'text-body bg-neutral-primary-soft border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft',
  success:
    'text-white bg-success hover:bg-success-strong focus:ring-4 focus:ring-success-medium',
  danger:
    'text-white bg-danger hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium',
  warning:
    'text-white bg-warning hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium',
  dark: 'text-white bg-dark hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary',
  ghost:
    'text-heading bg-transparent border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary',
};

@Component({
  selector: 'coffee-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('base');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  isDisabled = computed(() => this.disabled() || this.loading());

  classes = computed(() => `${BASE} ${SIZES[this.size()]} ${VARIANTS[this.variant()]}`);
}
