import mongoose from 'mongoose';
import config from './app/config';
import seedSuperAdmin from './app/DB';
import app from './app';

async function main() {
  try {
    const connection = await mongoose.connect(config.database_url!);
    if (connection) {
      console.log('Database connection established');
    } else {
      console.log('DB connection failed');
    }
    seedSuperAdmin();

    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
