import { setupWorker } from 'msw';
import { loginHandlers } from './loginHandlers';
import { infoHandlers } from './infoHandlers';
import { scheduleHandler } from './ScheduleHandlers';
import { postsHandlers } from './postsHandlers';

export const worker = setupWorker(...loginHandlers, ...infoHandlers, ...scheduleHandler, ...postsHandlers);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
