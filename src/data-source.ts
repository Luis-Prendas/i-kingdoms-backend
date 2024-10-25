import { DataSource } from 'typeorm';
import { Attribute } from './entities/attribute';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/database.sqlite', // Ajusta la ruta de tu base de datos SQLite
  entities: [Attribute],
  synchronize: true,
});

export default AppDataSource;
