// Dependencies
import { json, LoaderFunction } from 'remix';

declare var CONTENT: KVNamespace;

export let loader: LoaderFunction = async () => {
  const data = (await CONTENT.get('$$content-sha', 'json')) || {
    commit: { sha: '' },
  };

  return json(data);
};
