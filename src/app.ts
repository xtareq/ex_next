import 'reflect-metadata';
import {
  createExpressServer,
  RoutingControllersOptions,
  useExpressServer,
} from 'routing-controllers';
import express, { Express } from 'express';

import { Service } from 'typedi';
import { Container } from 'typedi';
import { useContainer } from 'routing-controllers';

abstract class BaseAppliction {
  static initialize(options: RoutingControllersOptions = {}): Express {
    const app = express();

    useContainer(Container);
    useExpressServer(app, {
      ...options,
      development: false,
      defaultErrorHandler: false,
      defaults: {
        //with this option, null will return 404 by default
        nullResultCode: 404,

        //with this option, void or Promise<void> will return 204 by default
        undefinedResultCode: 204,

        paramOptions: {
          //with this option, argument will be required by default
          required: true,
        },
      },
    });

    app.use((err, req, res, next) => {
      if (err) {
        let errors = {
          message: '',
          status: 500,
          errors: '',
        };
        console.log(err);
        if (err.hasOwnProperty('httpCode')) {
          (errors['status'] = err.httpCode),
            (errors['message'] = err.message),
            (errors['errors'] = err.errors);
        }
        res.status(errors.status).send(errors);
      }
    });

    return app;
  }
}
@Service()
export class Appliction extends BaseAppliction {
  static createApp<T>(options: RoutingControllersOptions = {}) {
    return this.initialize(options);
  }
}

export default { Appliction };
