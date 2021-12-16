import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NestjsNotifyModule } from '@sinuos/nestjs-notification';
import { WebhookChannelService } from './webhook-channel.service';
import { WebhookChannel } from './bootstrap';

@Global()
@Module({
  imports: [NestjsNotifyModule.register({}), HttpModule],
  providers: [WebhookChannelService, WebhookChannel],
  exports: [WebhookChannelService, HttpModule],
})
export class WebhookChannelModule {}
