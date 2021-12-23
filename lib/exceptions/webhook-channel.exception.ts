/**
 * @class WebhookChannelException
 * @extends Error
 */
export class WebhookChannelException extends Error {
  /**
   * @constructor
   * @param message
   */
  constructor(message: string) {
    super(message);

    this.name = 'WebhookChannelException';
  }
}
