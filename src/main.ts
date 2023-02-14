import { Appliction } from './app';
import { Express } from 'express';
import { AppController } from './controllers/AppController';
let app = Appliction.createApp<Express>({
  controllers: [AppController],
});

app.listen(5000, () => {
  console.log('APp listening on port:5000');
});
