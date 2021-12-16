import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {INestjsNotifyChannel} from "@sinuos/nestjs-notification";
import { AxiosResponse } from 'axios';
import { IWebhookChannel } from "./webhook.interface";

@Injectable()
export class WebhookChannel implements INestjsNotifyChannel {
  /**
   * @constructor
   * @param {HttpService} http
   */
  constructor(@Inject(HttpService) private readonly http: HttpService) {}

  /**
   * Send notify
   * @public
   * @param {IWebhookChannel} notification
   * @return Promise<AxiosResponse<any>>
   */
  public async send(notification: IWebhookChannel): Promise<AxiosResponse<any>> {
    const message = WebhookChannel.getData(notification);

    return Promise.resolve(undefined);
  }

  /**
   * Get the data for the notification.
   * @param notification
   */
  private static getData(notification: IWebhookChannel) {
    if (typeof notification.toWebhook === 'function') {
      return notification.toWebhook();
    }

    if (typeof notification.toPayload === 'function') {
      return notification.toPayload();
    }

    throw new InternalServerErrorException(
      'Notification is missing toWebhook method.',
    );
  }
}
