import mongoose from 'mongoose';
import config from './app/config';
import seedSuperAdmin from './app/DB';
import app from './app';

async function main() {
  try {
    const connection = await mongoose.connect(config.database_url!);
    if (connection) {
      console.info('Database connection established');
    } else {
      console.error('DB connection failed');
    }
    seedSuperAdmin();

    app.listen(config.port, () => {
      console.info(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
