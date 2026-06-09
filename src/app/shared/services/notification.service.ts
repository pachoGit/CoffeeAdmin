import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSignal = signal<Notification | null>(null);
  readonly notification = this.notificationSignal.asReadonly();
  private timeoutId?: ReturnType<typeof setTimeout>;

  show(message: string, type: NotificationType = 'success', duration = 4000): void {
    this.clear();
    this.notificationSignal.set({ message, type });
    this.timeoutId = setTimeout(() => this.clear(), duration);
  }

  clear(): void {
    this.notificationSignal.set(null);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
