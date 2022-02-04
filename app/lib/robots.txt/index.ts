// Internals
import { getRobotsText } from './utils';
import type { RobotsConfig, RobotsPolicy } from '~/types';

let defaultPolicies: RobotsPolicy[] = [
  {
    type: 'userAgent',
    value: '*',
  },
  {
    type: 'allow',
    value: '/',
  },
];

export async function generateRobotsTxt(
  policies: RobotsPolicy[] = [],
  { appendOnDefaultPolicies = true, headers }: RobotsConfig = {}
) {
  let policiesToUse = appendOnDefaultPolicies
    ? [...defaultPolicies, ...policies]
    : policies;
  let robotText = getRobotsText(policiesToUse);
  let bytes = new TextEncoder().encode(robotText).byteLength;

  return new Response(robotText, {
    headers: {
      ...headers,
      'Content-Type': 'text/plain',
      'Content-Length': String(bytes),
    },
  });
}
