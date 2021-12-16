import {Global, Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {NestjsNotifyModule} from "@sinuos/nestjs-notification";
import {WebhookChannel} from "./webhook.channel";

@Global()
@Module({
    imports: [HttpModule.register({
        maxRedirects: 5,

    }), NestjsNotifyModule.register({})],
    providers: [WebhookChannel],
})
export class WebhookModule {}
