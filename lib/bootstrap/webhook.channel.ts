import { Inject, Injectable, Optional } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { INestjsNotificationChannel } from '@sinuos/nestjs-notification';
import { AxiosResponse } from 'axios';
import { IWebhookChannel, WebhookChannelModuleOptions } from '../interfaces';
import { WebhookChannelException } from '../exceptions';
import { WEBHOOK_CHANNEL_OPTIONS } from '../constants';

@Injectable()
export class WebhookChannel implements INestjsNotificationChannel {
  /**
   * @readonly
   * @private
   */
  private readonly url: string;

  /**
   * @constructor
   * @param options
   * @param {HttpService} http
   */
  constructor(
    private readonly http: HttpService,
    @Optional()
    @Inject(WEBHOOK_CHANNEL_OPTIONS)
    options: WebhookChannelModuleOptions,
  ) {
    if (options?.url) {
      this.url = options.url;
    }
  }

  /**
   * Send notify
   * @public
   * @param {IWebhookChannel} notification
   * @return Promise<AxiosResponse<any>>
   */
  public async send(
    notification: IWebhookChannel,
  ): Promise<AxiosResponse<any>> {
    // validator
    this.validator(notification);

    // get message content
    const message = WebhookChannel.getData(notification);

    // url
    const url = message.getUrl;

    // make http request.
    const response = await this.http.request({
      method: 'POST',
      url,
      data: message.getBody,
      headers: message.getHeader,
    });

    // return response
    return response.toPromise();
  }

  /**
   * Validator.
   * @method
   * @param {IWebhookChannel} notification
   * @private
   */
  private validator(notification: IWebhookChannel) {
    const message = WebhookChannel.getData(notification);

    /** Account sid is empty */
    if (!this.url && !message.getUrl) {
      throw new WebhookChannelException('URL is required');
    }
  }

  /**
   * Get data.
   * @method
   * @param {IWebhookChannel} notification
   * @private
   */
  private static getData(notification: IWebhookChannel) {
    return WebhookChannel.getChannelData(notification);
  }

  /**
   * Get the data for the notification.
   * @param notification
   */
  private static getChannelData(notification: IWebhookChannel) {
    if (typeof notification.toWebhook === 'function') {
      return notification.toWebhook();
    }

    // throw exception
    throw new WebhookChannelException(
      'Notification is missing toWebhook method.',
    );
  }
}
