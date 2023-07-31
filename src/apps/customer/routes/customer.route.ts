import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { validateReqSchema } from '.';
import { postSchema, getByIdSchema, putInactivateSchema, deleteSchema } from './schemas';
import { CustomerPostController } from '../controllers/customerPostController';
import { CustomerInactivatePutController } from '../controllers/customerInactivatePutController';
import { CustomerDeleteController } from '../controllers/customerDeleteController';
import { CustomerGetByIdController } from '../controllers/customerGetByIdController';

export const register = (router: Router) => {
  const relativeBaseUrl: string = '/customers';

  const customerPostController = container.get<CustomerPostController>(
    'Apps.customer.controllers.CustomerPostController'
  );
  const customerGetByIdController = container.get<CustomerGetByIdController>(
    'Apps.customer.controllers.CustomerGetByIdController'
  );
  const customerInactivatePutController = container.get<CustomerInactivatePutController>(
    'Apps.customer.controllers.CustomerInactivatePutController'
  );
  const customerDeleteController = container.get<CustomerDeleteController>(
    'Apps.customer.controllers.CustomerDeleteController'
  );

  router.post(`${relativeBaseUrl}/`, postSchema, validateReqSchema, (req: Request, res: Response) =>
    customerPostController.run(req, res)
  );

  router.get(`${relativeBaseUrl}/:id`, getByIdSchema, validateReqSchema, (req: Request, res: Response) =>
    customerGetByIdController.run(req, res)
  );

  router.put(
    `${relativeBaseUrl}/:id/inactivate`,
    putInactivateSchema,
    validateReqSchema,
    (req: Request, res: Response) => customerInactivatePutController.run(req, res)
  );

  router.delete(`${relativeBaseUrl}/:id`, deleteSchema, validateReqSchema, (req: Request, res: Response) =>
    customerDeleteController.run(req, res)
  );
};
