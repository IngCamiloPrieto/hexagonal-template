import { PubSub, Topic, Subscription } from '@google-cloud/pubsub';
export class PubSubConfigurer {
  private pubSubClient: PubSub;
  topic: Topic;
  subscription: Subscription;

  constructor() {
    this.pubSubClient = new PubSub();
    this.topic = this.pubSubClient.topic('');
    this.subscription = this.pubSubClient.subscription('');
  }
}
