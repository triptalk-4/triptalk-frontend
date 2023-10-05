import { setupWorker } from 'msw';
import { loginHandlers } from './loginHandlers';
import { infoHandlers } from './infoHandlers';
import { scheduleHandler } from './ScheduleHandlers';

export const worker = setupWorker(...loginHandlers, ...infoHandlers, ...scheduleHandler);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
