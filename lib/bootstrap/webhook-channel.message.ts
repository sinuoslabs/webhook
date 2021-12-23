import { WebhookChannelException } from '../exceptions';

/**
 * Webhook message
 * @class WebhookChannelMessage
 */
export class WebhookChannelMessage {
  /**
   * @public
   * @property {string} channelId
   */
  private url: string;

  /**
   * @public
   * @property {any} header
   */
  private header: any;

  /**
   * @public
   * @property {any} body
   */
  private body: any;

  /**
   * @constructor
   * @param {string} body
   */
  constructor(body: any) {
    this.body = body;
  }

  /**
   * Get url.
   */
  get getUrl() {
    return this.url;
  }

  /**
   * Set the message url.
   * @param {string} url
   * @return this
   */
  setUrl(url: string): WebhookChannelMessage {
    if (!url) {
      throw new WebhookChannelException('URL is not empty');
    }

    this.url = url;

    return this;
  }

  /**
   * Get header
   */
  get getHeader() {
    return this.header;
  }

  /**
   * Set the message header.
   * @param {any} header
   * @return this
   */
  setHeader(header: any): WebhookChannelMessage {
    this.header = header;

    return this;
  }

  /**
   * Get body
   */
  get getBody() {
    return this.body;
  }

  /**
   * Set the message body.
   * @param {any} body
   * @return this
   */
  setBody(body: any): WebhookChannelMessage {
    this.body = body;

    return this;
  }
}
