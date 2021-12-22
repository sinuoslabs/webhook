import { Injectable } from '@nestjs/common';
import {
  NestJsNotification,
  NestjsNotificationService,
} from '@sinuos/nestjs-notification';

@Injectable()
export class WebhookChannelService {
  /**
   * @constructor
   * @param {NestjsNotificationService} notifications
   */
  constructor(private readonly notifications: NestjsNotificationService) {}

  /**
   * Notify.
   * @param {NestJsNotification} notification
   */
  async notify(notification: NestJsNotification): Promise<any> {
    return this.notifications.send(notification);
  }
}
