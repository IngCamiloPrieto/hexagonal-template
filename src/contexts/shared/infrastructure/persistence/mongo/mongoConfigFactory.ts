import config from '../../../config';
import MongoConfig from '../../../../shared/infrastructure/persistence/mongo/mongoConfig';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
