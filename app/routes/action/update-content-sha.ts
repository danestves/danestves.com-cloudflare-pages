// Dependencies
import { ActionFunction, json } from 'remix';

export let action: ActionFunction = async ({ context, request }) => {
  try {
    let CONTENT = context.env.CONTENT as KVNamespace;
    let POST_CONTENT_BEARER_TOKEN = context.env.POST_CONTENT_BEARER_TOKEN;
    let key = request.headers.get('Authorization');

    if (key !== `Bearer ${POST_CONTENT_BEARER_TOKEN}`) {
      return new Response(`Unauthorized ${key}`, { status: 401 });
    }

    let data = await request.json();

    await CONTENT.put('$$content-sha', JSON.stringify(data));

    return json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      return json({ message: e.message, stack: e.stack });
    }

    return json({ message: 'Unknown error', stack: e });
  }
};
