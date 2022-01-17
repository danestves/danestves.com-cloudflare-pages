// Dependencies
import { createEventHandler } from '@remix-run/cloudflare-workers';

// Internals
// @ts-ignore
import * as build from '../build';

addEventListener('fetch', createEventHandler({ build }));
