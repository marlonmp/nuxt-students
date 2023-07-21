import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error('server utils: `MONGO_URI` is not defined');
}

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  await mongoose.connect(config.MONGO_URI, { ssl: false });
};
