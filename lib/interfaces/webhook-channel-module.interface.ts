import { ModuleMetadata, Provider, Type } from '@nestjs/common';

/**
 * @interface WebhookChannelModuleOptionsFactory
 * @property createWebhookChannelOptions()
 */
export interface WebhookChannelModuleOptionsFactory {
  createWebhookChannelOptions():
    | Promise<WebhookChannelModuleOptions>
    | WebhookChannelModuleOptions;
}

/**
 * @interface WebhookChannelModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 * @property useExisting
 * @property useClass
 * @property useFactory
 * @property inject
 * @property extraProviders
 */
export interface WebhookChannelModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<WebhookChannelModuleOptionsFactory>;
  useClass?: Type<WebhookChannelModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<WebhookChannelModuleOptions> | WebhookChannelModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}

/**
 * HTTP client.
 * @interface WebhookHttpClient
 */
export interface WebhookHttpClient {
  maxRedirects?: number;
  timeout?: number;
}

/**
 * @interface WebhookChannelConfig
 */
export interface WebhookChannelConfig {
  url?: string;
}

/**
 * @interface WebhookChannelModuleOptions
 * @property {string} twilioAccountSid
 * @property {string} twilioAuthToken
 * @property {string} endpoint
 */
export interface WebhookChannelModuleOptions
  extends WebhookHttpClient,
    WebhookChannelConfig {}
