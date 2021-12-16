/**
 * Webhook message
 * @class WebhookMessage
 */
export class WebhookMessage {
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
  construct(body: any) {
    this.body = body;
  }

  /**
   * Set the message url.
   * @param {string} url
   * @return this
   */
  setUrl(url: string): WebhookMessage {
    this.url = url;

    return this;
  }

  /**
   * Get url.
   */
  get getUrl() {
    return this.url;
  }

  /**
   * Set the message header.
   * @param {any} header
   * @return this
   */
  setHeader(header: any): WebhookMessage {
    this.header = header;

    return this;
  }

  /**
   * Get header
   */
  get getHeader() {
    return this.header;
  }

  /**
   * Set the message body.
   * @param {any} body
   * @return this
   */
  setBody(body: any): WebhookMessage {
    this.body = body;

    return this;
  }

  /**
   * Get body
   */
  get getBody() {
    return this.body;
  }
}
