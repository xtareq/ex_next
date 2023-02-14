import { Service } from '../decorators';

@Service()
export class AppService {
  sayHello(name?: string) {
    return name ? `Hello ${name}` : 'Hello';
  }
}
