import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { validateReqSchema } from '.';
import { postSchema, getByIdSchema, putInactivateSchema, deleteSchema } from './schemas';
import { CustomerPostController } from '../controllers/customerPost.controller';
import { CustomerInactivatePutController } from '../controllers/customerInactivatePut.controller';
import { CustomerDeleteController } from '../controllers/customerDelete.controller';
import { CustomerGetByIdController } from '../controllers/customerGetById.controller';

export const register = (router: Router) => {
  const relativeBaseUrl: string = '/customers';

  const customerPostController = container.get<CustomerPostController>(
    'apps.customer.controllers.CustomerPostController'
  );
  const customerGetByIdController = container.get<CustomerGetByIdController>(
    'apps.customer.controllers.CustomerGetByIdController'
  );
  const customerInactivatePutController = container.get<CustomerInactivatePutController>(
    'apps.customer.controllers.CustomerInactivatePutController'
  );
  const customerDeleteController = container.get<CustomerDeleteController>(
    'apps.customer.controllers.CustomerDeleteController'
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
