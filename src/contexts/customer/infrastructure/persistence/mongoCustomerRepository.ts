import { Nullable } from '../../../shared/domain/nullable';
import { MongoRepository } from '../../../shared/infrastructure/persistence/mongo/mongoRepository';
import { CustomerId } from '../../domain/valueObjects/customerId';
import { Customer } from '../../domain/customer';
import { CustomerRepository } from '../../domain/customerRepository';

interface CustomerDocument {
  _id: string;
  name: string;
  email: string;
}

export class MongoCustomerRepository extends MongoRepository<Customer> implements CustomerRepository {
  public save(customer: Customer): Promise<void> {
    return this.persist(customer.id.value, customer);
  }

  public async search(id: CustomerId): Promise<Nullable<Customer>> {
    const collection = await this.collection();
    const document = await collection.findOne<CustomerDocument>({ _id: id.value });

    return document
      ? Customer.fromPrimitives({ name: document.name, email: document.email, id: id.value })
      : null;
  }

  protected collectionName(): string {
    return 'customers';
  }

  public async searchAll(): Promise<Customer[]> {
    const collection = await this.collection();
    const documents = await collection.find<CustomerDocument>({}, {}).toArray();

    return documents.map(document =>
      Customer.fromPrimitives({ name: document.name, email: document.email, id: document._id })
    );
  }
}
