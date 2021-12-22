import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  NestjsNotificationModule,
  NestjsNotificationModuleOptions,
} from '@sinuos/nestjs-notification';
import { WebhookChannelService } from './webhook-channel.service';
import { WebhookChannel } from './bootstrap';

@Global()
@Module({
  imports: [
    NestjsNotificationModule.register(<NestjsNotificationModuleOptions>{}),
    HttpModule,
  ],
  providers: [WebhookChannelService, WebhookChannel],
  exports: [WebhookChannelService, HttpModule],
})
export class WebhookChannelModule {}
