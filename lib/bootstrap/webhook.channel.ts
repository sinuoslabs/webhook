import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { INestjsNotificationChannel } from '@sinuos/nestjs-notification';
import { AxiosResponse } from 'axios';
import { IWebhookChannel } from './webhook.interface';

@Injectable()
export class WebhookChannel implements INestjsNotificationChannel {
  /**
   * @constructor
   * @param {HttpService} http
   */
  constructor(private readonly http: HttpService) {}

  /**
   * Send notify
   * @public
   * @param {IWebhookChannel} notification
   * @return Promise<AxiosResponse<any>>
   */
  public async send(
    notification: IWebhookChannel,
  ): Promise<AxiosResponse<any>> {
    const message = WebhookChannel.getData(notification);

    const response = await this.http.request({
      method: 'POST',
      url: message.getUrl,
      data: message.getBody,
      headers: message.getHeader,
    });

    return response.toPromise();
  }

  /**
   * Get the data for the notification.
   * @param notification
   */
  private static getData(notification: IWebhookChannel) {
    if (typeof notification.toWebhook === 'function') {
      return notification.toWebhook();
    }

    throw new InternalServerErrorException(
      'Notification is missing toWebhook method.',
    );
  }
}
