import { Connection, EntitySchema, Repository } from 'typeorm';
import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<Connection>) {}

  protected abstract entitySchema(): EntitySchema<T>;

  protected client(): Promise<Connection> {
    return this._client;
  }

  protected async repository(): Promise<Repository<T>> {
    return (await this._client).getRepository(this.entitySchema());
  }

  protected async persist<P>(aggregateRoot: T): Promise<P> {
    const repository = await this.repository();
    return await repository.save(aggregateRoot as any);
  }
  protected async remove(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    const { id }: any = aggregateRoot;
    await repository.delete({ id } as any);
  }
}
