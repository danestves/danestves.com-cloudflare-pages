// Dependencies
import { ActionFunction, json } from 'remix';

declare var CONTENT: KVNamespace;
declare var POST_CONTENT_BEARER_TOKEN: string;

export let action: ActionFunction = async ({ request }) => {
  try {
    const key = request.headers.get('Authorization');

    if (key !== `Bearer ${POST_CONTENT_BEARER_TOKEN}`) {
      return new Response(`Unauthorized ${key}`, { status: 401 });
    }

    const data = (await request.json()) as any;

    await CONTENT.put(data.kv_slug, JSON.stringify(data));

    return json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      return json({ message: e.message, stack: e.stack });
    }

    return json({ message: 'Unknown error', stack: e });
  }
};
