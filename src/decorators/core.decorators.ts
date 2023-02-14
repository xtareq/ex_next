import {
  Controller as BaseController,
  JsonController as BaseJsonController,
} from 'routing-controllers';
import { Service as TService } from 'typedi';

export const Service = TService;
export function Controller(...args: Parameters<typeof BaseController>) {
  return <TFunction extends Function>(target: TFunction) => {
    Service()(target);
    BaseController(...args)(target);
  };
}
export function JsonController(...args: Parameters<typeof BaseController>) {
  return <TFunction extends Function>(target: TFunction) => {
    Service()(target);
    BaseJsonController(...args)(target);
  };
}
