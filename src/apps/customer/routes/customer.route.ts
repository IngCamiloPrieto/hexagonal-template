import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { validateReqSchema } from '.';
import { postSchema, putSchema, deleteSchema } from './schemas';
import { CustomerPostController } from '../controllers/customerPostController';
import { CustomerPutController } from '../controllers/customerPutController';
import { CustomerDeleteController } from '../controllers/customerDeleteController';

export const register = (router: Router) => {
  const relativeBaseUrl: String = '/customers';

  const customerPostController = container.get<CustomerPostController>(
    'Apps.customer.controllers.CustomerPostController'
  );
  const customerPutController = container.get<CustomerPutController>('Apps.customer.controllers.CustomerPutController');
  const customerDeleteController = container.get<CustomerDeleteController>('Apps.customer.controllers.CustomerDeleteController');

  router.post(`${relativeBaseUrl}/`, postSchema, validateReqSchema, (req: Request, res: Response) =>
    customerPostController.run(req, res)
  );

  router.put(`${relativeBaseUrl}/:id`, putSchema, validateReqSchema, (req: Request, res: Response) =>
    customerPutController.run(req, res)
  );

  router.delete(`${relativeBaseUrl}/:id`, deleteSchema, validateReqSchema, (req: Request, res: Response) =>
    customerDeleteController.run(req, res)
  );
};
