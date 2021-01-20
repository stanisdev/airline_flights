import { Entity } from './components/entity';

const query = 'country add Argentina'; // Simulate a query
(async () => {
  const e = new Entity('countries');
  try {
    await e.add('Canada');
  } catch (err) {
    console.error(err.message);
  }
})();