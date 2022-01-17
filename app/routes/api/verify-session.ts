// Dependencies
import { json, LoaderFunction } from 'remix';

declare var SESSION_SECRET: KVNamespace;

export let loader: LoaderFunction = async () => {
  return json({
    SESSION_SECRET,
  });
};
