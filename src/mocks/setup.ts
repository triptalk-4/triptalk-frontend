import { setupWorker } from 'msw';
import { loginHandlers } from './loginHandlers';
import { infoHandlers } from './infoHandlers';

export const worker = setupWorker(...loginHandlers, ...infoHandlers);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
