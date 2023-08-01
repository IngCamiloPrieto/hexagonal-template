import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import StatusController from '../controllers/statusGet.controller';

export const register = (router: Router) => {
  const controller: StatusController = container.get('apps.customer.controllers.StatusGetController');
  router.get('/customers/status', (req: Request, res: Response) => controller.run(req, res));
};
