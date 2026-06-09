import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'coffee-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification.html',
})
export class NotificationComponent {
  protected notificationService = inject(NotificationService);
}
