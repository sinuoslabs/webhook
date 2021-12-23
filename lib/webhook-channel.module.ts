import {
  DynamicModule,
  Global,
  Module,
  Provider,
  ValueProvider,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebhookChannel } from './bootstrap';
import {
  WebhookChannelModuleAsyncOptions,
  WebhookChannelModuleOptions,
  WebhookChannelModuleOptionsFactory,
} from './interfaces';
import { WEBHOOK_CHANNEL_OPTIONS } from './constants';
import { WebhookChannelException } from './exceptions';

@Global()
@Module({})
export class WebhookChannelModule {
  /**
   * Register module
   * @static
   * @param {WebhookChannelModuleOptions} options
   * @return DynamicModule
   */
  static register(options: WebhookChannelModuleOptions): DynamicModule {
    const channelProvider: ValueProvider = {
      provide: WEBHOOK_CHANNEL_OPTIONS,
      useValue: options,
    };

    return {
      module: WebhookChannelModule,
      imports: [
        HttpModule.register({
          maxRedirects: options.maxRedirects || 5,
          timeout: options.timeout || 5000,
        }),
      ],
      providers: [WebhookChannel, channelProvider],
      exports: [WebhookChannel, HttpModule, channelProvider],
    };
  }

  /**
   * Register async
   * @static
   * @param {WebhookChannelModuleAsyncOptions} options
   * @return DynamicModule
   */
  static registerAsync(
    options: WebhookChannelModuleAsyncOptions,
  ): DynamicModule {
    const channelProvider: ValueProvider = {
      provide: WEBHOOK_CHANNEL_OPTIONS,
      useValue: options,
    };

    return {
      module: WebhookChannelModule,
      imports: options.imports || [],
      providers: [
        WebhookChannel,
        channelProvider,
        ...this.createAsyncProviders(options),
      ],
      exports: [WebhookChannel, HttpModule, channelProvider],
    };
  }

  /**
   * Create async providers
   * @private
   * @param {WebhookChannelModuleAsyncOptions} options
   * @return Provider[]
   */
  private static createAsyncProviders(
    options: WebhookChannelModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncConfigProvider(options)];
    } else if (!options.useClass) {
      return [
        {
          provide: WEBHOOK_CHANNEL_OPTIONS,
          useValue: {},
          inject: options.inject || [],
        },
      ];
    }

    return [
      this.createAsyncConfigProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  /**
   * Create async config provider
   * @private
   * @param {WebhookChannelModuleAsyncOptions} options
   * @return Provider<any>
   */
  private static createAsyncConfigProvider(
    options: WebhookChannelModuleAsyncOptions,
  ): Provider<any> {
    if (options.useFactory) {
      return {
        provide: WEBHOOK_CHANNEL_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useClass || options.useExisting;

    if (!inject) {
      throw new WebhookChannelException(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    return {
      provide: WEBHOOK_CHANNEL_OPTIONS,
      async useFactory(
        optionsFactory: WebhookChannelModuleOptionsFactory,
      ): Promise<WebhookChannelModuleOptions> {
        return optionsFactory.createWebhookChannelOptions();
      },
      inject: [inject],
    };
  }
}
