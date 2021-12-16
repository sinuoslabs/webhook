import { Injectable } from '@nestjs/common';
import { NestJsNotify, NestjsNotifyService } from '@sinuos/nestjs-notification';

@Injectable()
export class WebhookChannelService {
  /**
   * @constructor
   * @param notifications
   */
  constructor(private readonly notifications: NestjsNotifyService) {}

  /**
   * Notify notification.
   * @param notification
   */
  async notify(notification: NestJsNotify): Promise<any> {
    return this.notifications.send(notification);
  }
}
