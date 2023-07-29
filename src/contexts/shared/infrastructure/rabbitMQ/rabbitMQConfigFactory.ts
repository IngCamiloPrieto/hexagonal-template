import { ConnectionSettings } from '../../../shared/infrastructure/eventBus/rabbitMq/connectionSettings';
import { ExchangeSetting } from '../../../shared/infrastructure/eventBus/rabbitMq/exchangeSetting';
import config from '../../config';

export type RabbitMQConfig = {
  connectionSettings: ConnectionSettings;
  exchangeSettings: ExchangeSetting;
  maxRetries: number;
  retryTtl: number;
};
export class RabbitMQConfigFactory {
  static createConfig(): RabbitMQConfig {
    return config.get('rabbitmq');
  }
}
