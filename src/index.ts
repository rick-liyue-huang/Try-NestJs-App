import { dataSource } from '../ormconfig';
import { User } from './entities/User';

dataSource
  .initialize()
  .then(async () => {
    const res = await dataSource.manager.find(User);
    console.log(res);
  })
  .catch((err) => console.log(err));
