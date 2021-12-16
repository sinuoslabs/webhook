import { NestJsNotify } from '@sinuos/nestjs-notification';

/**
 * Webhook channel model
 * @interface IWebhookChannel
 * @extends NestJsNotify
 */
export interface IWebhookChannel extends NestJsNotify {
  /**
   * Get the Http representation of the notification.
   * @property
   * @returns {any} http payload data
   */
  toWebhook(): any;
}
