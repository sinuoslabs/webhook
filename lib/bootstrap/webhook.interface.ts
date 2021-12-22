import { NestJsNotification } from '@sinuos/nestjs-notification';

/**
 * Webhook channel model
 * @interface IWebhookChannel
 * @extends NestJsNotification
 */
export interface IWebhookChannel extends NestJsNotification {
  /**
   * Get the Http representation of the notification.
   * @property
   * @returns {any} http payload data
   */
  toWebhook?(): any;
}
